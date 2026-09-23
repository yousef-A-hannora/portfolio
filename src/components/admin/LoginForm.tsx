'use client';

import { useActionState } from 'react';
import { LogIn } from 'lucide-react';
import { loginAction } from '@/actions/auth';
import { Field } from './form/Field';
import { FormMessage } from './form/FormMessage';
import { inputClass, primaryButtonClass } from './form/styles';

export function LoginForm() {
  const [error, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <FormMessage type="error" message={error} />
      <Field label="Email" htmlFor="email">
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </Field>
      <Field label="Password" htmlFor="password">
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </Field>
      <button type="submit" className={`${primaryButtonClass} w-full py-3`} disabled={isPending}>
        {isPending ? 'Signing in…' : 'Sign in'} <LogIn size={16} />
      </button>
    </form>
  );
}
