import { Suspense } from "react";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/auth";

async function ProtectedAdminContent({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAF9]" />}>
      <ProtectedAdminContent>{children}</ProtectedAdminContent>
    </Suspense>
  );
}
