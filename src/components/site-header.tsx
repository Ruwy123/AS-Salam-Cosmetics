import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop#categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-[0.2em] text-slate-900 uppercase"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#40BFC1] text-sm font-bold text-white">
            A
          </span>
          AS-Salam
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[#40BFC1]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="rounded-full border border-slate-200 p-2.5 text-slate-700 transition hover:border-[#40BFC1] hover:text-[#40BFC1]"
            aria-label="Search products"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            href="/login"
            className="rounded-full border border-slate-200 p-2.5 text-slate-700 transition hover:border-[#40BFC1] hover:text-[#40BFC1]"
            aria-label="Account"
          >
            <User className="h-4 w-4" />
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full bg-[#40BFC1] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#2fa5a7]"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart (2)
          </Link>
        </div>
      </div>
    </header>
  );
}
