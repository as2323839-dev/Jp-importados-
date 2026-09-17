const { getInventory, hasDatabase } = require('./db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  if (!hasDatabase()) {
    return res.status(200).json({ database:false, inventory:null });
  }

  try {
    const inventory = await getInventory();
    return res.status(200).json({ database:true, inventory });
  } catch (err) {
    console.error('Catalog database error', String(err && err.message || err));
    return res.status(500).json({ error:'Não foi possível consultar o estoque.' });
  }
};
