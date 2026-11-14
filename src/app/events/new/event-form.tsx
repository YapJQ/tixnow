"use client";

import { useActionState } from "react";
import { createEvent } from "@/app/actions/events";
import { Field, FormError, SubmitButton } from "@/components/ui";

export function EventForm() {
  const [state, action, pending] = useActionState(createEvent, undefined);
  const v = state?.values;
  return (
    <form action={action} className="space-y-4">
      <FormError message={state?.error} />
      <Field label="Title" name="title" defaultValue={v?.title} required maxLength={120} />
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Description</span>
        <textarea
          name="description"
          defaultValue={v?.description}
          rows={4}
          maxLength={5000}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </label>
      <Field label="Venue" name="venue" defaultValue={v?.venue} required />
      <Field label="Starts at" name="startsAt" defaultValue={v?.startsAt} type="datetime-local" required />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Ticket price (USD)" name="price" type="number" min={0} step="0.01" defaultValue={v?.price ?? "0"} required />
        <Field label="Capacity" name="capacity" type="number" min={1} step={1} defaultValue={v?.capacity ?? "100"} required />
      </div>
      <SubmitButton pending={pending}>Create event</SubmitButton>
    </form>
  );
}
