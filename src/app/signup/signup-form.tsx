"use client";

import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import { Field, FormError, SubmitButton } from "@/components/ui";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <form action={action} className="space-y-4">
      <FormError message={state?.error} />
      <Field label="Name" name="name" defaultValue={state?.values?.name} autoComplete="name" required />
      <Field label="Email" name="email" defaultValue={state?.values?.email} type="email" autoComplete="email" required />
      <Field label="Password" name="password" type="password" autoComplete="new-password" minLength={8} required />
      <SubmitButton pending={pending}>Sign up</SubmitButton>
    </form>
  );
}
