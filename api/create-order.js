const crypto = require('crypto');

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function validEmail(v) {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) return res.status(503).json({ error: 'Mercado Pago ainda não configurado no servidor.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { method, amount, payer, external_reference, card } = body;
    const total = Number(amount);

    if (!Number.isFinite(total) || total <= 0) {
      return res.status(400).json({ error: 'Valor inválido.' });
    }
    if (!payer || !validEmail(payer.email)) {
      return res.status(400).json({ error: 'E-mail do comprador inválido.' });
    }

    const payment = {
      amount: total.toFixed(2),
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

    const payload = {
      type: 'online',
      processing_mode: 'automatic',
      total_amount: total.toFixed(2),
      external_reference: external_reference || `jp-${Date.now()}`,
      payer: {
        email: payer.email,
        first_name: payer.first_name || undefined,
        last_name: payer.last_name || undefined,
        identification: payer.identification || undefined
      },
      transactions: { payments: [payment] }
    };

    const mp = await fetch('https://api.mercadopago.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Idempotency-Key': crypto.randomUUID()
      },
      body: JSON.stringify(payload)
    });

    const data = await mp.json();
    return res.status(mp.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao criar pagamento.', detail: String(err && err.message || err) });
  }
};