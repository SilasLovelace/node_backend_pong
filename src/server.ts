// import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
// import sqlite3 from 'sqlite3';
// import { open, Database } from 'sqlite';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';

// dotenv.config();

// const fastify: FastifyInstance = Fastify({ logger: true });

// // Open SQLite database (async)
// let db: Database | undefined;
// async function initDB(): Promise<void> {
//   // Ensure database directory exists
//   const dbDir = path.resolve('./database');
//   if (!fs.existsSync(dbDir)) {
//     fs.mkdirSync(dbDir, { recursive: true });
//   }
//   db = await open({
//     filename: './database/transcendenceDB.db',
//     driver: sqlite3.Database
//   });

//   // Create table if it doesn't exist
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       email TEXT UNIQUE
//     )
//   `);
// }

// (async () => {
//   await initDB();

//   // Routes
//   fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
//     if (!db) return [];
//     const users = await db.all('SELECT * FROM users');
//     return users;
//   });

//   fastify.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
//     if (!db) return { error: 'Database not initialized' };
//     const { name, email } = request.body as { name: string; email: string };

//     try {
//       const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
//       return { id: result.lastID };
//     } catch (err: any) {
//       reply.status(400);
//       return { error: err.message };
//     }
//   });

//   // Start server
//   fastify.listen({ port: 3000 }, (err: Error | null, address: string) => {
//     if (err) throw err;
//     console.log(`Server running at ${address}`);
//   });
// })();
// import Fastify from 'fastify';
// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';

// dotenv.config();

// const fastify = Fastify({ logger: true });

// // Open SQLite database (async)
// let db;
// async function initDB() {
//   // Ensure database directory exists
//   const dbDir = path.resolve('./database');
//   if (!fs.existsSync(dbDir)) {
//     fs.mkdirSync(dbDir, { recursive: true });
//   }
//   db = await open({
//     filename: './database/transcendenceDB.db',
//     driver: sqlite3.Database
//   });

//   // Create table if it doesn't exist
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       email TEXT UNIQUE
//     )
//   `);
// }

// await initDB();

// // Routes
// fastify.get('/users', async () => {
//   const users = await db.all('SELECT * FROM users');
//   return users;
// });

// fastify.post('/users', async (request, reply) => {
//   const { name, email } = request.body;

//   try {
//     const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
//     return { id: result.lastID };
//   } catch (err) {
//     reply.status(400);
//     return { error: err.message };
//   }
// });

// // Start server
// fastify.listen({ port: 3000 }, (err, address) => {
//   if (err) throw err;
//   console.log(`Server running at ${address}`);
// });
