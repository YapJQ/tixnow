import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/session";
import "./globals.css";

export const metadata: Metadata = {
  title: "TixNow",
  description: "Buy and sell event tickets with QR entry",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold text-indigo-600">TixNow</Link>
            {user ? (
              <div className="flex items-center gap-4 text-sm">
                <span className="text-zinc-500">Hi, {user.name}</span>
                <form action={logout}>
                  <button className="hover:underline">Log out</button>
                </form>
              </div>
            ) : (
              <div className="flex gap-4 text-sm">
                <Link href="/login" className="hover:underline">Log in</Link>
                <Link href="/signup" className="hover:underline">Sign up</Link>
              </div>
            )}
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
