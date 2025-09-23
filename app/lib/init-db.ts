import pool from "./db";

export async function initDatabase() {
  let client;
  try {
    client = await pool.connect();
    console.log("Connected to database, initializing tables...");

    // إنشاء جدول cars إذا لم يكن موجوداً
    await client.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        description TEXT,
        kilometers INTEGER,
        status VARCHAR(50) DEFAULT 'available',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // إنشاء جدول car_images إذا لم يكن موجوداً
    await client.query(`
      CREATE TABLE IF NOT EXISTS car_images (
        id SERIAL PRIMARY KEY,
        car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE,
        image_url VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    if (client) client.release();
  }
}
