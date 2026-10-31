export default function CheckoutPage() {
  return (
    <div className="container-shell py-12">
      <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">
        Checkout
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="space-y-5 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              type="text"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              type="tel"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Delivery address
            </label>
            <input
              type="text"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              City
            </label>
            <input
              type="text"
              className="w-full rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Delivery notes
            </label>
            <textarea
              rows={4}
              className="w-full rounded-[1.5rem] border border-slate-200 bg-[#F8FAF9] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
            />
          </div>
        </form>

        <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Order summary
          </h2>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Radiant Glow Serum</span>
              <span>GHS 68</span>
            </div>
            <div className="flex justify-between">
              <span>Healing Facial Cream</span>
              <span>GHS 148</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>GHS 18</span>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
            <div className="flex justify-between">
              <span>Total</span>
              <span>GHS 234</span>
            </div>
          </div>
          <button className="mt-8 w-full rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7]">
            Pay now
          </button>
        </aside>
      </div>
    </div>
  );
}
