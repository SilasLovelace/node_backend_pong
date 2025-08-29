import Fastify from 'fastify';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({ logger: true });

// Open SQLite database (async)
let db;
async function initDB() {
  db = await open({
    filename: './database/transcendenceDB.db',
    driver: sqlite3.Database
  });

  // Create table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE
    )
  `);
}

await initDB();

// Routes
fastify.get('/users', async () => {
  const users = await db.all('SELECT * FROM users');
  return users;
});

fastify.post('/users', async (request, reply) => {
  const { name, email } = request.body;

  try {
    const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return { id: result.lastID };
  } catch (err) {
    reply.status(400);
    return { error: err.message };
  }
});

// Start server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running at ${address}`);
});
