import Sidebar from "../components/Sidebar";
import AuthGuard from "../components/AuthGuard";
import "./api/key/api-key.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="min-h-full flex bg-[#f5f5f7] dark:bg-[#09090b] text-[#1a1a2e] dark:text-[#ededed] overflow-hidden">
        {/* Sidebar Client Component */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-white dark:bg-[#121214] flex flex-col h-screen overflow-y-auto pb-20 md:pb-0 relative">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
