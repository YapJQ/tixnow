import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { EventForm } from "./event-form";

export default async function NewEventPage() {
  if (!(await getCurrentUser())) redirect("/login");
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold">Create an event</h1>
      <EventForm />
    </div>
  );
}
