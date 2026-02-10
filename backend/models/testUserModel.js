import dotenv from 'dotenv';
dotenv.config();

import UserModel from './user.model.js';

async function testUserModel() {
  try {
    console.log('--- Creating user ---');
    const newUser = await UserModel.create({
      username: 'Hero',
      password: '123456',
      role: 'user',
      created_by: null
    });
    console.log('Created:', newUser);

    console.log('\n--- Fetching all users ---');
    const users = await UserModel.getAll();
    console.log(users);

    console.log('\n--- Finding by username ---');
    const foundUser = await UserModel.findByUsername('testuser');
    console.log(foundUser);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit();
  }
}

testUserModel();
