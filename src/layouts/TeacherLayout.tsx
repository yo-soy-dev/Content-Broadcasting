import AuthGuard from "@/components/auth/AuthGuard";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={["teacher"]}>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        
        <Sidebar role="teacher" />

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