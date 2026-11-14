import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { SignupForm } from "./signup-form";

export default async function SignupPage() {
  if (await getCurrentUser()) redirect("/");
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-6 text-2xl font-bold">Create your account</h1>
      <SignupForm />
      <p className="mt-4 text-sm text-zinc-500">
        Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
}
