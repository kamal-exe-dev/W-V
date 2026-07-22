import bcrypt from 'bcryptjs'
import { prisma } from '../lib/database/prisma'

// Bootstraps the first ADMIN account (there's no self-registration by design).
// Usage: ADMIN_EMAIL=you@company.com ADMIN_PASSWORD=... ADMIN_NAME="Your Name" npm run db:create-admin
async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@webandvisuals.com'
  const password = process.env.ADMIN_PASSWORD ?? 'ChangeMe123!'
  const name = process.env.ADMIN_NAME ?? 'Admin'

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log(`A user with email ${email} already exists (role: ${existing.role}). Nothing to do.`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.user.create({
    data: { name, email, passwordHash, role: 'ADMIN', status: 'Active', emailVerified: new Date() },
  })

  console.log(`Admin account created:\n  email:    ${email}\n  password: ${password}\n\nSign in at /login, then change the password from Settings.`)
}

main().finally(() => prisma.$disconnect())
