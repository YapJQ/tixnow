import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Home() {
  const events = await db.event.findMany({
    where: { startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
    take: 50,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Upcoming events</h1>
        <Link href="/events/new" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
          Create event
        </Link>
      </div>
      {events.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 p-10 text-center text-zinc-500 dark:border-zinc-700">
          No upcoming events yet. Be the first to create one.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {events.map((e) => (
            <li key={e.id}>
              <Link href={`/events/${e.id}`} className="block rounded-lg border border-zinc-200 p-4 transition hover:border-indigo-400 hover:shadow-sm dark:border-zinc-800">
                <p className="text-sm text-indigo-600">{formatDate(e.startsAt)}</p>
                <h2 className="mt-1 text-lg font-semibold">{e.title}</h2>
                <p className="text-sm text-zinc-500">{e.venue}</p>
                <p className="mt-2 text-sm font-medium">{formatPrice(e.priceCents)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
