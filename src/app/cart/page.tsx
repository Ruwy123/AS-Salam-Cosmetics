import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

const items = [
  {
    id: "1",
    name: "Radiant Glow Serum",
    size: "30ml",
    price: 68,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    name: "Healing Facial Cream",
    size: "50ml",
    price: 74,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
  },
];

export default function CartPage() {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 250 ? 0 : 18;
  const total = subtotal + shipping;

  return (
    <div className="container-shell py-12">
      <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">
        Your cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="h-24 w-24 overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 justify-between gap-4">
                <div>
                  <h2 className="text-lg font-medium text-slate-900">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{item.size}</p>
                  <p className="mt-3 text-base font-semibold text-slate-900">
                    GHS {item.price}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button className="rounded-full border border-slate-200 p-2 text-slate-500 hover:border-[#40BFC1] hover:text-[#40BFC1]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-[#F8FAF9] px-2 py-1">
                    <button className="p-1">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-6 text-center text-sm font-medium text-slate-700">
                      {item.quantity}
                    </span>
                    <button className="p-1">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Order summary
          </h2>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>GHS {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `GHS ${shipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>GHS 0</span>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
            <div className="flex justify-between">
              <span>Total</span>
              <span>GHS {total}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7]"
          >
            <ShoppingBag className="h-4 w-4" />
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
