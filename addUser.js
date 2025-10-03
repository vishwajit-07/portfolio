import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const password = 'Vishu@2001'
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.userPortfolio.create({
        data: {
            name: 'Admin User',
            email: 'vishwajitmavalankar54339@gmail.com',
            password: hashedPassword,
            role: 'admin',
        },
    })

    console.log('User created:', user)
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
