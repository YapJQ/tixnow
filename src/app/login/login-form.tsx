"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Field, FormError, SubmitButton } from "@/components/ui";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="space-y-4">
      <FormError message={state?.error} />
      <Field label="Email" name="email" defaultValue={state?.values?.email} type="email" autoComplete="email" required />
      <Field label="Password" name="password" type="password" autoComplete="current-password" required />
      <SubmitButton pending={pending}>Log in</SubmitButton>
    </form>
  );
}
