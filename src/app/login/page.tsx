import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Login to your account
        </h1>

        <AuthForm mode="login" />
      </div>
    </div>
  );
}
