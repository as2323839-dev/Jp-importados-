module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Signature, X-Request-Id');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) return res.status(503).json({ error: 'Mercado Pago não configurado.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const orderId = (req.query && (req.query['data.id'] || req.query.data_id)) || (body.data && body.data.id);
    if (!orderId) return res.status(200).json({ received: true, ignored: true });

    const mp = await fetch(`https://api.mercadopago.com/v1/orders/${encodeURIComponent(orderId)}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!mp.ok) {
      console.error('Mercado Pago webhook: order verification failed', orderId, mp.status);
      return res.status(200).json({ received: true, verified: false });
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
    return res.status(200).json({ received: true, error: true });
  }
};