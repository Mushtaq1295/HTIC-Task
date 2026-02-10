import bcrypt from 'bcrypt';

const password = '4321';

async function generate() {
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
}

generate();
