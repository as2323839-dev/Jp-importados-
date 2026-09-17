const crypto = require('crypto');
const { applyPaymentUpdate, hasDatabase } = require('./db');

function timingSafeHexEqual(a, b) {
  if (!/^[0-9a-f]+$/i.test(a || '') || !/^[0-9a-f]+$/i.test(b || '')) return false;
  const ab = Buffer.from(a, 'hex');
  const bb = Buffer.from(b, 'hex');
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

function validateWebhookSignature(req, dataId, secret) {
  const xSignature = String(req.headers['x-signature'] || '');
  const xRequestId = String(req.headers['x-request-id'] || '');
  if (!xSignature || !xRequestId || !dataId || !secret) return false;
  const parts = Object.fromEntries(xSignature.split(',').map(part => {
    const i = part.indexOf('=');
    return i === -1 ? [part.trim(), ''] : [part.slice(0, i).trim(), part.slice(i + 1).trim()];
  }));
  const ts = parts.ts;
  const received = parts.v1;
  if (!ts || !received) return false;
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest('hex');
  return timingSafeHexEqual(expected, received);
}

function normalizeItems(order) {
  return Array.isArray(order && order.items) ? order.items.map(item => ({
    id: item.external_code || item.id || '',
    name: item.title || item.name || '',
    quantity: Number(item.quantity || 0),
    unit_price: Number(item.unit_price || 0),
    total: Number(item.total_amount || 0)
  })).filter(item => item.id && Number.isInteger(item.quantity) && item.quantity > 0) : [];
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Signature, X-Request-Id');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  if (!accessToken || !webhookSecret) return res.status(503).json({ error: 'Mercado Pago não configurado.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const orderId = String((req.query && (req.query['data.id'] || req.query.data_id)) || (body.data && body.data.id) || '');
    if (!orderId) return res.status(400).json({ error: 'ID da order não informado.' });

    if (!validateWebhookSignature(req, orderId, webhookSecret)) {
      console.warn('Mercado Pago webhook: invalid signature', orderId);
      return res.status(401).json({ error: 'Assinatura inválida.' });
    }

    const mp = await fetch(`https://api.mercadopago.com/v1/orders/${encodeURIComponent(orderId)}`, {
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json' }
    });

    if (!mp.ok) {
      console.error('Mercado Pago webhook: order verification failed', orderId, mp.status);
      return res.status(502).json({ received: true, verified: false });
    }

    const order = await mp.json();
    const payments = order && order.transactions && order.transactions.payments;
    const payment = Array.isArray(payments) ? payments[0] : null;
    const status = (payment && payment.status) || order.status || '';
    const detail = (payment && payment.status_detail) || order.status_detail || '';
    const approved = ['processed','approved','accredited'].includes(String(status).toLowerCase()) || String(detail).toLowerCase() === 'accredited';
    const externalReference = String(order.external_reference || `mp-${order.id}`);
    const items = normalizeItems(order);

    let persistence = { database:false, stock_applied:false };
    if (hasDatabase()) {
      persistence = await applyPaymentUpdate({
        mp_order_id: order.id ? String(order.id) : orderId,
        external_reference: externalReference,
        status,
        status_detail: detail,
        approved,
        total_amount: Number(order.total_amount || 0),
        items
      });
    }

    console.log(JSON.stringify({
      event: 'mercado_pago_order_webhook',
      order_id: order.id,
      external_reference: externalReference,
      status,
      status_detail: detail,
      approved,
      stock_applied: persistence.stock_applied,
      database: persistence.database,
      total_amount: order.total_amount,
      live_mode: order.live_mode,
      items
    }));

    return res.status(200).json({ received:true, verified:true, approved, ...persistence });
  } catch (err) {
    console.error('Mercado Pago webhook error', String(err && err.message || err));
    return res.status(500).json({ error: 'Erro ao processar webhook.' });
  }
};
