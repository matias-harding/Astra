"use client"

import * as React from "react"
import { format } from "date-fns"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Event } from "@/generated/prisma"

interface Calendar31Props {
  events: Event[]
}

const formatDateRange = (from: Date, to: Date) =>
  `${format(from, 'MMM d, h:mm a')} - ${format(to, 'h:mm a')}`

export default function Calendar31({ events }: Calendar31Props) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const dayEvents = events.filter((event) => {
    if (!date) return false
    const d = new Date(event.startTime)
    return (
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
    )
  })

  return (
    <Card className="w-fit py-4 self-center">
      <CardContent className="px-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border [--cell-size:--spacing(22)] md:[--cell-size:--spacing(23)]"
          buttonVariant="ghost"
          weekStartsOn={1}
          required
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 border-t px-4 !pt-4">
        <div className="flex w-full items-center justify-between px-1">
          <div className="text-sm font-medium">
            {date?.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            title="Add Event"
          >
            <PlusIcon />
            <span className="sr-only">Add Event</span>
          </Button>
        </div>
        <div className="flex w-full flex-col gap-2">
          {dayEvents.length === 0 ? (
            <p className="text-muted-foreground text-sm px-1">No events for this day.</p>
            ) : (
            dayEvents.map((event) => (
              <div
                key={event.id}
                className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-muted-foreground text-xs">
                  {formatDateRange(new Date(event.startTime), new Date(event.endTime))}
                </div>
              </div>
            ))
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
