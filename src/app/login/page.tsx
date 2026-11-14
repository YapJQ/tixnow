import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verify?: string }>;
}) {
  if (await getCurrentUser()) redirect("/");
  const { verify } = await searchParams;
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-6 text-2xl font-bold">Log in</h1>
      {verify && (
        <p className="mb-4 rounded-md bg-indigo-50 px-3 py-2 text-sm text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
          Account created. Check your email to verify it before logging in.
        </p>
      )}
      <LoginForm />
      <p className="mt-4 text-sm text-zinc-500">
        New here? <Link href="/signup" className="text-indigo-600 hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
