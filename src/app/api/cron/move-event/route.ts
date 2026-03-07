import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const EVENT_ID = 1

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const event = await prisma.event.findUnique({ where: { id: EVENT_ID } })
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  const newStartTime = new Date(event.startTime)
  newStartTime.setDate(newStartTime.getDate() + 7)

  const newEndTime = new Date(event.endTime)
  newEndTime.setDate(newEndTime.getDate() + 7)

  await prisma.event.update({
    where: { id: EVENT_ID },
    data: { startTime: newStartTime, endTime: newEndTime },
  })

  return NextResponse.json({ success: true, newStartTime, newEndTime })
}
