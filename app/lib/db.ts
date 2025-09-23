import { Pool } from 'pg';

// تحقق من أن متغيرات البيئة محملة بشكل صحيح
console.log('Database connection details:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD ? '***' : 'MISSING',
  port: process.env.DB_PORT
});

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'shehtadatabase',
  password: process.env.DB_PASSWORD || '49314758',
  port: parseInt(process.env.DB_PORT || '5432'),
});

export default pool;