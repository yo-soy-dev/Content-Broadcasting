"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["teacher"]}>
      <div className="flex h-screen bg-indigo-50/30 dark:bg-gray-950 overflow-hidden">
        <Sidebar role="teacher" />
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