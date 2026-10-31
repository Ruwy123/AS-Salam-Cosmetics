export default function AdminInventoryPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Inventory
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Stock management
        </h1>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Radiant Glow Serum", "18 units", "Healthy"],
            ["Dew Cream Cleanser", "9 units", "Low stock"],
            ["Velvet Lip Revive", "30 units", "Healthy"],
          ].map(([name, stock, state]) => (
            <div
              key={name}
              className="rounded-2xl border border-slate-200 bg-[#F8FAF9] p-4"
            >
              <div className="text-base font-semibold text-slate-900">
                {name}
              </div>
              <div className="mt-2 text-sm text-slate-500">{stock}</div>
              <div className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-[#40BFC1]">
                {state}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
