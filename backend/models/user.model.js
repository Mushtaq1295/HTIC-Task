import pool from '../config/db.js';

const UserModel = {
  // Create a new user
  async create({ username, password, role, created_by }) {
    const query = `
      INSERT INTO users (username, password, role, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, role, created_by, created_at;
    `;
    const values = [username, password, role, created_by];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Find user by username (for login)
  async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await pool.query(query, [username]);
    return result.rows[0];
  },

  // Find user by ID
  async findById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Get all users
  async getAll() {
    const query = `
      SELECT id, username, role, created_by, created_at
      FROM users
      ORDER BY id ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Update user
  async update(id, { username, role }) {
    const query = `
      UPDATE users
      SET username = $1,
          role = $2,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, username, role, created_by, updated_at;
    `;
    const values = [username, role, id];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Delete user
  async delete(id) {
    const query = `
      DELETE FROM users
      WHERE id = $1
      RETURNING id, username, role;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

export default UserModel;
