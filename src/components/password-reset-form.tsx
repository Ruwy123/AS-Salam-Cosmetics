"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  sendPasswordResetAction,
  updatePasswordAction,
} from "@/app/auth-actions";
import { initialAuthActionState } from "@/lib/auth-state";

type PasswordResetFormProps = {
  mode: "request" | "update";
};

export function PasswordResetForm({ mode }: PasswordResetFormProps) {
  const action =
    mode === "request" ? sendPasswordResetAction : updatePasswordAction;
  const [state, formAction, isPending] = useActionState(
    action,
    initialAuthActionState,
  );
  const isRequest = mode === "request";

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor={isRequest ? "email" : "password"}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {isRequest ? "Email" : "New password"}
        </label>
        <input
          id={isRequest ? "email" : "password"}
          name={isRequest ? "email" : "password"}
          type={isRequest ? "email" : "password"}
          autoComplete={isRequest ? "email" : "new-password"}
          required
          minLength={isRequest ? undefined : 8}
          className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
          placeholder={isRequest ? "you@example.com" : "At least 8 characters"}
        />
      </div>
      {state.message && (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={`text-sm leading-6 ${state.status === "error" ? "text-red-700" : "text-emerald-700"}`}
        >
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7] disabled:cursor-wait disabled:opacity-70"
      >
        {isPending
          ? "Please wait..."
          : isRequest
            ? "Send reset link"
            : "Update password"}
      </button>
      {isRequest && (
        <p className="text-center text-sm text-slate-600">
          Remembered it?{" "}
          <Link href="/login" className="text-[#218f91]">
            Back to login
          </Link>
        </p>
      )}
    </form>
  );
}
