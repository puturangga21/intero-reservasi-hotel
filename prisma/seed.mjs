import 'dotenv/config';
import { faker } from '@faker-js/faker';

import { PrismaClient } from './generated/prisma/index.js';

import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Memulai proses seeding...');

  const JUMLAH_DATA = 20;

  for (let i = 0; i < JUMLAH_DATA; i++) {
    const firstName = faker.person.firstName();
    const email = faker.internet.email({ firstName }).toLowerCase();

    await prisma.customer.create({
      data: {
        fullname: faker.person.fullName(),
        email: email,
        password: 'password123',
        phone_number: '081246545857',
        img_identity: faker.image.avatar(),
      },
    });
  }

  console.log(`✅ Berhasil menambahkan ${JUMLAH_DATA} data customer.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Terjadi error saat seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
