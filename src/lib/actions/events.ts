'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: { startTime: 'asc' },
    include: { user: { select: { name: true } } },
  })
}

export async function createEvent(formData: FormData) {
  const title = formData.get('title') as string
  const startDateStr = formData.get('startDate') as string
  const startTimeStr = formData.get('startTime') as string
  const endDateStr = formData.get('endDate') as string
  const endTimeStr = formData.get('endTime') as string

  const startTime = new Date(`${startDateStr}T${startTimeStr}`)
  const endTime = new Date(`${endDateStr}T${endTimeStr}`)

  try {
    await prisma.event.create({ data: { title, startTime, endTime, userId: 1 } })
    revalidatePath('/')
    return {}
  } catch (e) {
    console.error('Error creating event: ', e)
    return { error: 'Failed to create event. Please try again.' }
  }

  revalidatePath('/')
}