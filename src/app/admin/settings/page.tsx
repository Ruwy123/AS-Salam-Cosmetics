export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Store settings
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Business configuration
        </h1>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Store name
            </label>
            <input
              defaultValue="AS-Salam Cosmetics"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Currency
            </label>
            <input
              defaultValue="GHS"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contact email
            </label>
            <input
              defaultValue="hello@as-salamcosmetics.com"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Delivery fee
            </label>
            <input
              defaultValue="18"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
