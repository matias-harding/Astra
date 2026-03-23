
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

export default function AddEvent() {
  return (
          <Dialog>
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
              <FieldGroup>
                <Field>
                  <Label htmlFor="new-event-title">Title</Label>
                  <Input id="new-event-title" name="title" />
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
  )
}