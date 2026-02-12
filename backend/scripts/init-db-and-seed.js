import dotenv from "dotenv";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

dotenv.config();

const USERS = [
  { username: "superadmin", password: "super123", role: "superadmin" },
  { username: "admin1", password: "admin123", role: "admin" },
  { username: "admin2", password: "admin456", role: "admin" },
  { username: "user1", password: "user123", role: "user" },
  { username: "user2", password: "user456", role: "user" },
];

async function createTables() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL CHECK (role IN ('superadmin', 'admin', 'user')),
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
  `;

  await pool.query(query);
}

async function findUserByUsername(username) {
  const result = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
  return result.rows[0] || null;
}

async function ensureUser({ username, password, role, createdBy }) {
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    return existingUser.id;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const insertResult = await pool.query(
    `
      INSERT INTO users (username, password, role, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `,
    [username, hashedPassword, role, createdBy]
  );

  return insertResult.rows[0].id;
}

async function seedUsers() {
  const superadminId = await ensureUser({
    ...USERS[0],
    createdBy: null,
  });

  await ensureUser({
    ...USERS[1],
    createdBy: superadminId,
  });

  await ensureUser({
    ...USERS[2],
    createdBy: superadminId,
  });

  const admin1 = await findUserByUsername("admin1");
  const createdByForUsers = admin1 ? admin1.id : superadminId;

  await ensureUser({
    ...USERS[3],
    createdBy: createdByForUsers,
  });

  await ensureUser({
    ...USERS[4],
    createdBy: createdByForUsers,
  });
}

async function initDbAndSeed() {
  try {
    console.log("Initializing DB schema...");
    await createTables();
    console.log("Schema ready.");

    console.log("Seeding default users...");
    await seedUsers();
    console.log("Seed complete.");
  } catch (error) {
    console.error("DB init/seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

initDbAndSeed();