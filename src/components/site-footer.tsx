import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-[#F8FAF9]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="mb-4 text-lg font-semibold tracking-[0.2em] text-slate-900 uppercase">
            AS-Salam
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-600">
            Thoughtful beauty essentials designed to support confidence, calm
            skin, and nourishing rituals.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
            Quick links
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/shipping-policy">Shipping</Link>
            </li>
            <li>
              <Link href="/returns">Returns</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Accra, Ghana</li>
            <li>hello@as-salamcosmetics.com</li>
            <li>+233 20 000 0000</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
