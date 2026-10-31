import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[60vh] items-center justify-center py-16">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Page not found
        </h1>
        <p className="mt-3 text-slate-600">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
