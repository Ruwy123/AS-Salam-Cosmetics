import { Suspense } from "react";
import { requireUser } from "@/lib/auth";

async function AccountContent() {
  const user = await requireUser();
  const fullName =
    user.user_metadata.full_name ?? user.email?.split("@")[0] ?? "Customer";

  return (
    <div className="container-shell py-16">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          My account
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.5rem] bg-[#EAF7F6] p-5">
            <div className="text-sm uppercase tracking-[0.12em] text-slate-500">
              Profile
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">
              {fullName}
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-[#F8FAF9] p-5">
            <div className="text-sm uppercase tracking-[0.12em] text-slate-500">
              Orders
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">
              {user.email}
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-[#F8FAF9] p-5">
            <div className="text-sm uppercase tracking-[0.12em] text-slate-500">
              Delivery
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">
              Signed in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="container-shell min-h-96 py-16" />}>
      <AccountContent />
    </Suspense>
  );
}
