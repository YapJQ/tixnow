"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import type { FormState } from "./auth";

const eventSchema = z.object({
  title: z.string().trim().min(1, "Enter a title").max(120),
  description: z.string().trim().max(5000).default(""),
  venue: z.string().trim().min(1, "Enter a venue").max(200),
  startsAt: z.coerce
    .date({ errorMap: () => ({ message: "Enter a valid date and time" }) })
    .refine((d) => d.getTime() > Date.now(), "The event must be in the future"),
  price: z.coerce.number().min(0, "Price can't be negative").max(100000),
  capacity: z.coerce.number().int("Capacity must be a whole number").min(1, "Capacity must be at least 1").max(1000000),
});

export async function createEvent(_: FormState, formData: FormData): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const values = Object.fromEntries(
    [...formData.entries()].filter(([k]) => !k.startsWith("$")).map(([k, v]) => [k, String(v)]),
  );
  const parsed = eventSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message, values };
  const { price, ...rest } = parsed.data;

  const event = await db.event.create({
    data: { ...rest, priceCents: Math.round(price * 100), organizerId: user.id },
  });
  redirect(`/events/${event.id}`);
}
