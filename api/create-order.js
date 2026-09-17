const crypto = require('crypto');
const { getInventory, savePendingOrder, hasDatabase } = require('./db');

const CATALOG = {
  'oculos': { name: 'Óculos de Sol', price: 74.90, stock: 6 },
  'relogio-prata': { name: 'Relógio Prata', price: 49.90, stock: 1 },
  'invictus': { name: 'Invictus', price: 470.00, stock: 2 },
  'one-million': { name: '1 Million', price: 544.90, stock: 1 },
  'relogio-dourado': { name: 'Relógio Dourado', price: 1190.00, stock: 1 },
  'relogio-dourado-2': { name: 'Relógio Dourado 2', price: 1140.00, stock: 1 }
};

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function validEmail(v) {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function splitName(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  return { first_name: parts.shift() || '', last_name: parts.join(' ') || undefined };
}

function clean(v, max = 120) {
  return String(v || '').trim().slice(0, max);
}

async function calculateCart(items) {
  if (!Array.isArray(items) || !items.length) throw new Error('Carrinho vazio.');
  const inventoryRows = hasDatabase() ? await getInventory() : null;
  const liveStock = new Map((inventoryRows || []).map(row => [row.product_id, Number(row.stock)]));
  let totalCents = 0;
  const normalized = [];

  for (const item of items) {
    const p = CATALOG[item && item.id];
    const quantity = Number(item && item.quantity);
    const available = liveStock.has(item && item.id) ? liveStock.get(item.id) : (p && p.stock);
    if (!p || !Number.isInteger(quantity) || quantity < 1 || quantity > Number(available || 0)) {
      throw new Error('Produto sem estoque suficiente ou quantidade inválida.');
    }
    const unitCents = Math.round(p.price * 100);
    totalCents += unitCents * quantity;
    normalized.push({ id: item.id, name: p.name, quantity, unit_price: p.price, total: (unitCents * quantity) / 100 });
  }
  return { total: totalCents / 100, items: normalized };
}

function paymentInfo(order) {
  const payments = order && order.transactions && order.transactions.payments;
  const payment = Array.isArray(payments) ? payments[0] : null;
  return {
    status: (payment && payment.status) || (order && order.status) || '',
    detail: (payment && payment.status_detail) || (order && order.status_detail) || ''
  };
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) return res.status(503).json({ error: 'Mercado Pago ainda não configurado no servidor.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { method, payer, card, delivery } = body;
    const cart = await calculateCart(body.items);

    if (!payer || !validEmail(payer.email)) return res.status(400).json({ error: 'E-mail do comprador inválido.' });

    const names = splitName(payer.name);
    const cpf = String(payer.cpf || '').replace(/\D/g, '');
    const phone = String(payer.phone || '').replace(/\D/g, '').slice(0, 15);
    if (cpf.length !== 11) return res.status(400).json({ error: 'CPF inválido.' });
    if (!names.first_name) return res.status(400).json({ error: 'Nome do comprador inválido.' });

    const payment = {
      amount: cart.total.toFixed(2),
      payment_method: method === 'pix'
        ? { id: 'pix', type: 'bank_transfer' }
        : {
            id: card && card.payment_method_id,
            type: 'credit_card',
            token: card && card.token,
            installments: Number(card && card.installments) || 1
          }
    };

    if (method !== 'pix' && (!payment.payment_method.id || !payment.payment_method.token)) {
      return res.status(400).json({ error: 'Dados do cartão incompletos.' });
    }

    const externalReference = `jp-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const d = delivery || {};
    const safeDelivery = {
      cep: clean(d.cep, 12), street: clean(d.street, 160), number: clean(d.number, 30),
      neighborhood: clean(d.neighborhood, 100), city: clean(d.city, 100), state: clean(d.state, 60),
      complement: clean(d.complement, 120)
    };

    const payload = method === 'pix'
      ? {
          type: 'online',
          processing_mode: 'automatic',
          total_amount: cart.total.toFixed(2),
          external_reference: externalReference,
          transactions: { payments: [payment] },
          payer: { email: clean(payer.email, 160) }
        }
      : {
          type: 'online',
          processing_mode: 'automatic',
          total_amount: cart.total.toFixed(2),
          external_reference: externalReference,
          description: `Pedido ${externalReference} - JP Importados`,
          payer: {
            email: clean(payer.email, 160),
            first_name: clean(names.first_name, 80),
            last_name: names.last_name ? clean(names.last_name, 120) : undefined,
            identification: { type: 'CPF', number: cpf }
          },
          items: cart.items.map(item => ({
            title: item.name,
            external_code: item.id,
            quantity: item.quantity,
            unit_price: item.unit_price.toFixed(2),
            total_amount: item.total.toFixed(2),
            unit_measure: 'unit'
          })),
          additional_info: {
            payer: {
              first_name: clean(names.first_name, 80),
              last_name: names.last_name ? clean(names.last_name, 120) : undefined,
              phone: phone ? { number: phone } : undefined,
              address: {
                zip_code: safeDelivery.cep,
                street_name: safeDelivery.street,
                street_number: safeDelivery.number,
                neighborhood: safeDelivery.neighborhood,
                city: safeDelivery.city,
                state: safeDelivery.state,
                complement: safeDelivery.complement
              }
            }
          },
          transactions: { payments: [payment] }
        };

    const mp = await fetch('https://api.mercadopago.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Idempotency-Key': externalReference
      },
      body: JSON.stringify(payload)
    });

    const data = await mp.json();
    if (!mp.ok) return res.status(mp.status).json({ error: 'Mercado Pago recusou a solicitação.', mercado_pago: data });

    const info = paymentInfo(data);
    let persisted = false;
    try {
      persisted = await savePendingOrder({
        mp_order_id: data.id ? String(data.id) : null,
        external_reference: data.external_reference || externalReference,
        status: info.status,
        status_detail: info.detail,
        approved: false,
        total_amount: cart.total,
        customer_name: clean(payer.name, 180),
        customer_email: clean(payer.email, 160),
        customer_phone: phone,
        delivery: safeDelivery,
        items: cart.items
      });
    } catch (dbErr) {
      console.error('Order persistence error', String(dbErr && dbErr.message || dbErr));
    }

    return res.status(mp.status).json({
      ...data,
      test_mode: false,
      database: hasDatabase(),
      order_persisted: Boolean(persisted),
      validated_total: cart.total,
      validated_items: cart.items,
      external_reference: data.external_reference || externalReference
    });
  } catch (err) {
    const message = String(err && err.message || err);
    const status = /Carrinho|Produto|quantidade|estoque|comprador|CPF/.test(message) ? 400 : 500;
    return res.status(status).json({ error: message || 'Erro ao criar pagamento.' });
  }
};
