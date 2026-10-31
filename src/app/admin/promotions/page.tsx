export default function AdminPromotionsPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Promotions
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Discount management
        </h1>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["GLOW10", "10% off", "Active"],
            ["FREESHIP", "Free shipping", "Scheduled"],
            ["BUNDLE30", "30% off", "Inactive"],
          ].map(([code, value, state]) => (
            <div
              key={code}
              className="rounded-2xl border border-slate-200 bg-[#F8FAF9] p-4"
            >
              <div className="text-base font-semibold text-slate-900">
                {code}
              </div>
              <div className="mt-2 text-sm text-slate-500">{value}</div>
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
