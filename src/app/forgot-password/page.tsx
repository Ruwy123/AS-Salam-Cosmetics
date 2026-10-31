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
          <button
            type="submit"
            className="w-full rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7]"
          >
            Send reset link
          </button>
        </form>
      </div>
    </div>
  );
}
