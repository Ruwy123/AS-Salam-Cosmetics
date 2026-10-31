export default function AdminCategoriesPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Categories
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Category management
        </h1>
      </div>
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "Skincare",
            "Face care",
            "Body care",
            "Hair care",
            "Beauty essentials",
          ].map((name) => (
            <div
              key={name}
              className="rounded-2xl border border-slate-200 bg-[#F8FAF9] p-4 text-sm font-medium text-slate-700"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
