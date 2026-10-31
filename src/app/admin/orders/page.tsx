export default function AdminOrdersPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Orders
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Order management
        </h1>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            ["#1024", "Pending", "GHS 410"],
            ["#1023", "Processing", "GHS 126"],
            ["#1022", "Delivered", "GHS 86"],
          ].map(([id, status, total]) => (
            <div
              key={id}
              className="rounded-2xl border border-slate-200 bg-[#F8FAF9] p-4"
            >
              <div className="text-base font-semibold text-slate-900">{id}</div>
              <div className="mt-2 text-sm text-slate-500">{status}</div>
              <div className="mt-3 text-sm font-medium text-slate-900">
                {total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
