import { format } from 'date-fns'
import type { Event } from "@/generated/prisma"

const formatDateRange = (from: Date, to: Date) =>
  `${format(from, 'MMM d, h:mm a')} - ${format(to, 'h:mm a')}`

export default function Event(event: Event) {
  return (
          <div
            key={event.id}
            className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
          >
            <div className="font-medium">{event.title}</div>
            <div className="text-muted-foreground text-xs">
              {formatDateRange(new Date(event.startTime), new Date(event.endTime))}
            </div>
          </div>
  )
}