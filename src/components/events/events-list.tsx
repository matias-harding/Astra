import type { Event } from "@/generated/prisma"
import { format } from "date-fns"

interface EventsListProps {
  events: (Event & { user: { name: string } })[]
}

export function EventsList({ events }: EventsListProps) {
  if (events.length === 0) {
    return (
      <div className="bg-muted/50 mx-auto w-full max-w-3xl rounded-xl p-6 text-center text-sm text-muted-foreground">
        No events yet.
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-muted/50 rounded-xl p-4 flex flex-col gap-1"
        >
          <span className="font-medium">{event.title}</span>
          <span className="text-sm text-muted-foreground">
            {format(new Date(event.startTime), "PPP p")} →{" "}
            {format(new Date(event.endTime), "p")}
          </span>
          <span className="text-xs text-muted-foreground">
            {event.user.name}
          </span>
        </div>
      ))}
    </div>
  )
}
