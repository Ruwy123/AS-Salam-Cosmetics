import { PasswordResetForm } from "@/components/password-reset-form";

export default function ForgotPasswordPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Reset password
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Recover your account
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Enter your email and we’ll send instructions to reset your password.
        </p>

        <PasswordResetForm mode="request" />
      </div>
    </div>
  );
}
