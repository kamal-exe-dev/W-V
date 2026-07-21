import { prisma } from '@/lib/prisma'

export async function getSettingsData() {
  const [profile, agency] = await Promise.all([
    prisma.adminProfile.upsert({
      where: { id: 'singleton' },
      update: {},
      create: { id: 'singleton' },
    }),
    prisma.agencyProfile.upsert({
      where: { id: 'singleton' },
      update: {},
      create: { id: 'singleton' },
    }),
  ])

  return { profile, agency }
}
