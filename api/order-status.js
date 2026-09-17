module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) return res.status(503).json({ error: 'Mercado Pago ainda não configurado no servidor.' });

  const orderId = req.query && req.query.id;
  if (!orderId) return res.status(400).json({ error: 'ID da order não informado.' });

  try {
    const mp = await fetch(`https://api.mercadopago.com/v1/orders/${encodeURIComponent(orderId)}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });
    const data = await mp.json();
    return res.status(mp.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao consultar pagamento.', detail: String(err && err.message || err) });
  }
};