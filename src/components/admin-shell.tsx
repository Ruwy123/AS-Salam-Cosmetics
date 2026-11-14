import Link from "next/link";
import { signOutAction } from "@/app/auth-actions";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Boxes,
  Tag,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Promotions", href: "/admin/promotions", icon: Tag },
  { label: "Store settings", href: "/admin/settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-900">
      <aside className="fixed inset-y-0 left-0 w-72 border-r border-slate-200 bg-white p-6">
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#40BFC1] font-semibold text-white">
            A
          </span>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Admin
            </div>
            <div className="text-lg font-semibold">AS-Salam</div>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-[#EAF7F6] hover:text-[#40BFC1]"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <form action={signOutAction}>
          <button className="mt-8 flex w-full items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#40BFC1] hover:text-[#40BFC1]">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </form>
      </aside>

      <main className="ml-72 min-h-screen p-6 lg:p-8">{children}</main>
    </div>
  );
}
