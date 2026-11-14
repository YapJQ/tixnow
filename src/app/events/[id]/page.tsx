import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/format";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await db.event.findUnique({
    where: { id },
    include: { organizer: { select: { name: true } } },
  });
  if (!event) notFound();

  return (
    <article className="mx-auto max-w-2xl">
      <p className="text-sm font-medium text-indigo-600">{formatDate(event.startsAt)}</p>
      <h1 className="mt-1 text-3xl font-bold">{event.title}</h1>
      <p className="mt-2 text-zinc-500">
        {event.venue} · hosted by {event.organizer.name}
      </p>
      {event.description && <p className="mt-6 whitespace-pre-line">{event.description}</p>}
      <div className="mt-8 flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <div>
          <p className="text-xl font-semibold">{formatPrice(event.priceCents)}</p>
          <p className="text-sm text-zinc-500">{event.capacity} tickets</p>
        </div>
        <button disabled className="rounded-md bg-zinc-300 px-4 py-2 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" title="Ticket purchase is coming in the next step">
          Tickets coming soon
        </button>
      </div>
    </article>
  );
}
