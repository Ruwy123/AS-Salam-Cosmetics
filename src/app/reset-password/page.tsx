import { PasswordResetForm } from "@/components/password-reset-form";

export default function ResetPasswordPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-md rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Secure your account
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Choose a new password
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Use at least 8 characters. Your reset link can only be used once.
        </p>
        <PasswordResetForm mode="update" />
      </div>
    </div>
  );
}
