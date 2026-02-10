import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import UserModel from './models/user.model.js';

async function seedUsers() {
  try {
    const usersToSeed = [
      { username: 'superadmin', password: 'super123', role: 'superadmin', created_by: null },
      { username: 'admin1', password: 'admin123', role: 'admin', created_by: 1 },
      { username: 'admin2', password: 'admin456', role: 'admin', created_by: 1 },
      { username: 'user1', password: 'user123', role: 'user', created_by: 2 },
      { username: 'user2', password: 'user456', role: 'user', created_by: 2 },
      { username: 'Ani', password: 'user456', role: 'user', created_by: null },
    ];

    for (const user of usersToSeed) {
      // check if user already exists
      const existing = await UserModel.findByUsername(user.username);
      if (existing) {
        console.log(`User ${user.username} already exists. Skipping.`);
        continue;
      }

      // hash password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // create user
      const newUser = await UserModel.create({
        username: user.username,
        password: hashedPassword,
        role: user.role,
        created_by: user.created_by,
      });

      console.log(`Created user: ${newUser.username}`);
    }

    console.log('\nSeeding completed.');
  } catch (error) {
    console.error('Seeding error:', error.message);
  } finally {
    process.exit();
  }
}

seedUsers();
