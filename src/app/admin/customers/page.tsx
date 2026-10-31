export default function AdminCustomersPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Customers
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Customer directory
        </h1>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Aisha A.", "aisha@example.com", "3 orders"],
            ["Nadia M.", "nadia@example.com", "2 orders"],
            ["Ama K.", "ama@example.com", "5 orders"],
          ].map(([name, email, orders]) => (
            <div
              key={name}
              className="rounded-2xl border border-slate-200 bg-[#F8FAF9] p-4"
            >
              <div className="text-base font-semibold text-slate-900">
                {name}
              </div>
              <div className="mt-1 text-sm text-slate-500">{email}</div>
              <div className="mt-3 text-sm font-medium text-slate-700">
                {orders}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
