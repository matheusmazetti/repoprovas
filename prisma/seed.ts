import prisma from '../src/database.js'
import bcrypt from 'bcrypt';

async function main(){
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync("teste", SALT);
      await prisma.users.upsert({
      where: { email: "test@test.com" },
      update: {},
      create: {
        email: "test@test.com",
        password: hashedPassword
      }
    });
    
  }
  
  main().catch(e => {
    console.log(e);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  })