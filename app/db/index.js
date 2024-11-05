import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
console.log("new connection connected!!")
  return new PrismaClient();
};


// eslint-disable-next-line
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();


if(globalForPrisma.prisma){
    console.log("already prisma is connected!!")
}


export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;