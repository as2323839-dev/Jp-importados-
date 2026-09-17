const { Pool } = require('pg');

const INITIAL_STOCK = [
  ['oculos','Óculos de Sol',6],
  ['relogio-prata','Relógio Prata',1],
  ['invictus','Invictus',2],
  ['one-million','1 Million',1],
  ['relogio-dourado','Relógio Dourado',1],
  ['relogio-dourado-2','Relógio Dourado 2',1]
];

let pool;
let initialized = false;

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function getPool() {
  if (!hasDatabase()) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      max: 3
    });
  }
  return pool;
}

async function ensureSchema() {
  if (!hasDatabase()) return false;
  if (initialized) return true;
  const p = getPool();
  await p.query(`
    CREATE TABLE IF NOT EXISTS inventory (
      product_id TEXT PRIMARY KEY,
      product_name TEXT NOT NULL,
      stock INTEGER NOT NULL CHECK (stock >= 0),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS orders (
      id BIGSERIAL PRIMARY KEY,
      mp_order_id TEXT UNIQUE,
      external_reference TEXT UNIQUE NOT NULL,
      status TEXT,
      status_detail TEXT,
      approved BOOLEAN NOT NULL DEFAULT FALSE,
      stock_applied BOOLEAN NOT NULL DEFAULT FALSE,
      total_amount NUMERIC(12,2),
      customer_name TEXT,
      customer_email TEXT,
      customer_phone TEXT,
      delivery JSONB,
      items JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  for (const [id, name, stock] of INITIAL_STOCK) {
    await p.query(
      `INSERT INTO inventory (product_id, product_name, stock)
       VALUES ($1,$2,$3)
       ON CONFLICT (product_id) DO NOTHING`,
      [id, name, stock]
    );
  }
  initialized = true;
  return true;
}

async function getInventory() {
  if (!(await ensureSchema())) return null;
  const { rows } = await getPool().query('SELECT product_id, product_name, stock FROM inventory ORDER BY product_id');
  return rows;
}

async function savePendingOrder(order) {
  if (!(await ensureSchema())) return false;
  await getPool().query(
    `INSERT INTO orders (
      mp_order_id, external_reference, status, status_detail, approved,
      total_amount, customer_name, customer_email, customer_phone, delivery, items, updated_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11::jsonb,NOW())
    ON CONFLICT (external_reference) DO UPDATE SET
      mp_order_id = EXCLUDED.mp_order_id,
      status = EXCLUDED.status,
      status_detail = EXCLUDED.status_detail,
      approved = EXCLUDED.approved,
      total_amount = EXCLUDED.total_amount,
      customer_name = EXCLUDED.customer_name,
      customer_email = EXCLUDED.customer_email,
      customer_phone = EXCLUDED.customer_phone,
      delivery = EXCLUDED.delivery,
      items = EXCLUDED.items,
      updated_at = NOW()`,
    [
      order.mp_order_id || null,
      order.external_reference,
      order.status || null,
      order.status_detail || null,
      Boolean(order.approved),
      order.total_amount,
      order.customer_name || null,
      order.customer_email || null,
      order.customer_phone || null,
      JSON.stringify(order.delivery || {}),
      JSON.stringify(order.items || [])
    ]
  );
  return true;
}

async function applyPaymentUpdate(order) {
  if (!(await ensureSchema())) return { database:false, stock_applied:false };
  const p = getPool();
  const client = await p.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `INSERT INTO orders (mp_order_id, external_reference, status, status_detail, approved, total_amount, items, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,NOW())
       ON CONFLICT (external_reference) DO UPDATE SET
         mp_order_id = COALESCE(EXCLUDED.mp_order_id, orders.mp_order_id),
         status = EXCLUDED.status,
         status_detail = EXCLUDED.status_detail,
         approved = EXCLUDED.approved,
         total_amount = COALESCE(EXCLUDED.total_amount, orders.total_amount),
         items = CASE WHEN jsonb_array_length(EXCLUDED.items) > 0 THEN EXCLUDED.items ELSE orders.items END,
         updated_at = NOW()`,
      [order.mp_order_id || null, order.external_reference, order.status || null, order.status_detail || null, Boolean(order.approved), order.total_amount || null, JSON.stringify(order.items || [])]
    );

    const locked = await client.query('SELECT id, stock_applied, items FROM orders WHERE external_reference=$1 FOR UPDATE', [order.external_reference]);
    const row = locked.rows[0];
    let stockApplied = Boolean(row && row.stock_applied);

    if (order.approved && row && !stockApplied) {
      const items = Array.isArray(order.items) && order.items.length ? order.items : (row.items || []);
      for (const item of items) {
        const productId = item.id || item.external_code || item.product_id;
        const quantity = Number(item.quantity || 0);
        if (!productId || !Number.isInteger(quantity) || quantity < 1) continue;
        const updated = await client.query(
          `UPDATE inventory SET stock = stock - $1, updated_at=NOW()
           WHERE product_id=$2 AND stock >= $1
           RETURNING stock`,
          [quantity, productId]
        );
        if (!updated.rowCount) throw new Error(`Estoque insuficiente para ${productId}`);
      }
      await client.query('UPDATE orders SET stock_applied=TRUE, approved=TRUE, updated_at=NOW() WHERE id=$1', [row.id]);
      stockApplied = true;
    }

    await client.query('COMMIT');
    return { database:true, stock_applied:stockApplied };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { hasDatabase, ensureSchema, getInventory, savePendingOrder, applyPaymentUpdate };
