export default function AdminOverviewPage() {
  const metrics = [
    { label: "Total revenue", value: "GHS 28,400" },
    { label: "Total orders", value: "268" },
    { label: "Pending orders", value: "18" },
    { label: "Completed orders", value: "224" },
    { label: "Low stock items", value: "09" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
          Overview
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Dashboard
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-sm text-slate-500">{metric.label}</div>
            <div className="mt-3 text-2xl font-semibold text-slate-900">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent orders
          </h2>
          <div className="mt-5 space-y-3">
            {[
              { id: "#1024", total: "GHS 410", status: "Processing" },
              { id: "#1023", total: "GHS 126", status: "Shipped" },
              { id: "#1022", total: "GHS 86", status: "Pending" },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-b-0 last:pb-0"
              >
                <div>
                  <div className="font-medium text-slate-900">{order.id}</div>
                  <div className="text-sm text-slate-500">Customer order</div>
                </div>
                <div className="text-sm text-slate-600">{order.total}</div>
                <div className="rounded-full bg-[#EAF7F6] px-2.5 py-1 text-xs font-medium text-[#40BFC1]">
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Best sellers</h2>
          <div className="mt-5 space-y-4">
            {[
              "Radiant Glow Serum",
              "Healing Facial Cream",
              "Silk Hair Therapy Oil",
            ].map((product, index) => (
              <div key={product} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF7F6] text-sm font-semibold text-[#40BFC1]">
                    {index + 1}
                  </span>
                  <span className="text-sm text-slate-700">{product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
