"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

import type { Event } from "@/generated/prisma"

import DayEvent from "@/components/events/event"
import AddEvent from "@/components/events/add-event"

interface Calendar31Props {
  events: Event[]
}

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

          <AddEvent />          
        </div>
        <div className="flex w-full flex-col gap-2">
          {dayEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm px-1">
                No events for this day.
              </p>
            ) : (
              dayEvents.map((event) => (
                <DayEvent key={event.id} {...event} />
              ))
            )
          }
        </div>
      </CardFooter>
    </Card>
  )
}
