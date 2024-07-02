import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const connetDB = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected successfully.");

    await prisma.$disconnect();
  } catch (error) {
    console.error("Error connecting to Database:", error);
  }
};

export default connetDB;
