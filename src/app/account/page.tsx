export default function AccountPage() {
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
              Aisha A.
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-[#F8FAF9] p-5">
            <div className="text-sm uppercase tracking-[0.12em] text-slate-500">
              Orders
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">03</div>
          </div>
          <div className="rounded-[1.5rem] bg-[#F8FAF9] p-5">
            <div className="text-sm uppercase tracking-[0.12em] text-slate-500">
              Delivery
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">
              Accra
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
