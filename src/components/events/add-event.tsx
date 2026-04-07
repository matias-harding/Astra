"use client"

import { useState, useTransition } from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import EventDates from "@/components/events/fields/event-dates";
import { toast } from "sonner";
import { createEvent } from "@/lib/actions/events";

export default function AddEvent() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await createEvent(formData)
      if (!result?.error) {
        toast.success("Event created successfully!")
      }else{
        toast.error(result.error)
        return
      }
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          title="Add Event"
        >
          <PlusIcon />
          <span className="sr-only">Add Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="new-event-title">Title</Label>
              <Input id="new-event-title" name="title" required />
            </Field>

            <EventDates />

            <Field>
              <FieldLabel htmlFor="new-event-notes">
                Notes
              </FieldLabel>
              <Textarea
                id="new-event-notes"
                name="notes"
                placeholder="Add any additional details about the event here."
                className="resize-none"
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
