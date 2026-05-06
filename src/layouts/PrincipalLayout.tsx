import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function PrincipalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={["principal"]}>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        
        <Sidebar role="principal" />

        <div className="flex flex-col flex-1">
          
          <Navbar />

          <main className="flex-1 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}