import { PrismaClient } from "@prisma/client"

//Because of hot reloading in dev environment, we don't want the prisma client to constantly be making new connections to the DB
//So if we set up a global variable with the prisma client, we set up a variable that stores it or makes a new one if it is null and then setting it if we aren't in production.
//singleton patternnpm 

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = 
    globalForPrisma.prisma ??
        new PrismaClient({
            log: ['query'],
        })

if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma