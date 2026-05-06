"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function PrincipalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["principal"]}>
      <div className="flex h-screen bg-red-50/30 dark:bg-gray-950 overflow-hidden">
        <Sidebar role="principal" />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}