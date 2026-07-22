// Backward-compat shim. New code should import from '@/lib/database/prisma' directly.
// Kept so existing modules don't need touching during the incremental architecture migration.
export { prisma } from './database/prisma'
