import Link from "next/link";

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

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7]"
          >
            Login
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <Link href="/register" className="hover:text-[#40BFC1]">
            Create account
          </Link>
          <Link href="/forgot-password" className="hover:text-[#40BFC1]">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
