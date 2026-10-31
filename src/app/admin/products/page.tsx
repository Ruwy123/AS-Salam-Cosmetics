export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
            Products
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
            Product management
          </h1>
        </div>
        <button className="rounded-full bg-[#40BFC1] px-5 py-2.5 text-sm font-medium text-white">
          Add product
        </button>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            ["Radiant Glow Serum", "Skincare", "GHS 68"],
            ["Healing Facial Cream", "Skincare", "GHS 74"],
            ["Silk Hair Therapy Oil", "Hair care", "GHS 60"],
          ].map(([name, category, price]) => (
            <div
              key={name}
              className="rounded-2xl border border-slate-200 bg-[#F8FAF9] p-4"
            >
              <div className="text-base font-semibold text-slate-900">
                {name}
              </div>
              <div className="mt-1 text-sm text-slate-500">{category}</div>
              <div className="mt-3 text-sm font-medium text-slate-900">
                {price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
