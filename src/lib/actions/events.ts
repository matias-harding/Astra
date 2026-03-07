'use server'
import { prisma } from '@/lib/prisma'

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: { startTime: 'asc' },
    include: { user: { select: { name: true } } },
  })
}