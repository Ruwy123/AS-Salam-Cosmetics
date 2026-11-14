"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  loginAction,
  registerAction,
  resendConfirmationAction,
} from "@/app/auth-actions";
import { initialAuthActionState } from "@/lib/auth-state";

type AuthFormProps = {
  mode: "login" | "register";
};

const inputClassName =
  "w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]";

export function AuthForm({ mode }: AuthFormProps) {
  const action = mode === "login" ? loginAction : registerAction;
  const [state, formAction, isPending] = useActionState(
    action,
    initialAuthActionState,
  );
  const [resendState, resendFormAction, isResendPending] = useActionState(
    resendConfirmationAction,
    initialAuthActionState,
  );
  const isRegister = mode === "register";

  return (
    <div>
      <form action={formAction} className="mt-8 space-y-5">
        {isRegister && (
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              className={inputClassName}
              placeholder="Your name"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClassName}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
            minLength={8}
            className={inputClassName}
            placeholder="At least 8 characters"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7] disabled:cursor-wait disabled:opacity-70"
        >
          {isPending
            ? "Please wait..."
            : isRegister
              ? "Create account"
              : "Login"}
        </button>
      </form>

      {state.message && (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={`mt-5 text-sm leading-6 ${state.status === "error" ? "text-red-700" : "text-emerald-700"}`}
        >
          {state.message}
        </p>
      )}

      {isRegister && state.status === "success" && state.email && (
        <div>
          <form action={resendFormAction} className="mt-3">
            <input type="hidden" name="email" value={state.email} />
            <button
              type="submit"
              disabled={isResendPending}
              className="text-sm font-medium text-[#218f91] underline decoration-[#218f91]/40 underline-offset-4 hover:decoration-[#218f91] disabled:opacity-60"
            >
              {isResendPending ? "Sending..." : "Resend confirmation email"}
            </button>
          </form>
          {resendState.message && (
            <p
              role={resendState.status === "error" ? "alert" : "status"}
              className={`mt-3 text-sm leading-6 ${resendState.status === "error" ? "text-red-700" : "text-emerald-700"}`}
            >
              {resendState.message}
            </p>
          )}
          <p className="mt-4 text-xs leading-5 text-slate-500">
            During local development, open the email on this computer while the
            site is running. A localhost link will not open from another device.
          </p>
        </div>
      )}

      {!isRegister && (
        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <Link href="/register" className="hover:text-[#218f91]">
            Create account
          </Link>
          <Link href="/forgot-password" className="hover:text-[#218f91]">
            Forgot password?
          </Link>
        </div>
      )}
    </div>
  );
}
