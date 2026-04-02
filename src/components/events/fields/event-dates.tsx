"use client"

import * as React from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"


export default function EventDates() {
  const [startOpen, setStartOpen] = React.useState(false)
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date())

  const [endOpen, setEndOpen] = React.useState(false)
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date(Date.now() + 60 * 60 * 1000))

  return (
      <div className="grid grid-cols-2 gap-2">
        
        {/* START DATE */}
        <Field>
          <FieldLabel htmlFor="new-event-datepicker-start">Start at</FieldLabel>
          <Popover open={startOpen} onOpenChange={setStartOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="new-event-datepicker-start"
                className="w-32 justify-between font-normal"
              >
                {startDate ? format(startDate, "PPP") : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                captionLayout="dropdown"
                defaultMonth={startDate}
                onSelect={(date) => {
                  setStartDate(date)
                  setStartOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
          <input type="hidden" name="startDate" value={startDate ? format(startDate, "yyyy-MM-dd") : ""} />
        </Field>
        <Field className="w-32">
          <FieldLabel htmlFor="new-event-timepicker-start">Time</FieldLabel>
          <Input
            type="time"
            id="new-event-timepicker-start"
            name="startTime"
            step="1"
            defaultValue={format(new Date(), "HH:mm")}
            className="appearance-none bg-background 
            [&::-webkit-calendar-picker-indicator]:hidden 
            [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </Field>
        
        {/* END DATE */}
        <Field>
          <FieldLabel htmlFor="new-event-datepicker-end">Ends at</FieldLabel>
          <Popover open={endOpen} onOpenChange={setEndOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="new-event-datepicker-end"
                className="w-32 justify-between font-normal"
              >
                {endDate ? format(endDate, "PPP") : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                captionLayout="dropdown"
                defaultMonth={endDate}
                onSelect={(date) => {
                  setEndDate(date)
                  setEndOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
          <input type="hidden" name="endDate" value={endDate ? format(endDate, "yyyy-MM-dd") : ""} />
        </Field>
        <Field className="w-32">
          <FieldLabel htmlFor="new-event-timepicker-end">Time</FieldLabel>
          <Input
            type="time"
            id="new-event-timepicker-end"
            name="endTime"
            step="1"
            defaultValue={format(new Date(Date.now() + 60 * 60 * 1000), "HH:mm")}
            className="appearance-none bg-background 
            [&::-webkit-calendar-picker-indicator]:hidden 
            [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </Field>

      </div>
  )
}