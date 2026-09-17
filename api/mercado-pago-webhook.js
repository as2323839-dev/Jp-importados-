const crypto = require('crypto');

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

  const parts = Object.fromEntries(
    xSignature.split(',').map(part => {
      const i = part.indexOf('=');
      return i === -1 ? [part.trim(), ''] : [part.slice(0, i).trim(), part.slice(i + 1).trim()];
    })
  );

  const ts = parts.ts;
  const received = parts.v1;
  if (!ts || !received) return false;

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest('hex');
  return timingSafeHexEqual(expected, received);
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
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
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

    console.log(JSON.stringify({
      event: 'mercado_pago_order_webhook',
      order_id: order.id,
      external_reference: order.external_reference,
      status,
      status_detail: detail,
      approved,
      total_amount: order.total_amount,
      live_mode: order.live_mode,
      items: order.items || []
    }));

    return res.status(200).json({ received: true, verified: true, approved });
  } catch (err) {
    console.error('Mercado Pago webhook error', String(err && err.message || err));
    return res.status(500).json({ error: 'Erro ao processar webhook.' });
  }
};