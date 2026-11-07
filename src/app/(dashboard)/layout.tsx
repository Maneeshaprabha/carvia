import Sidebar from "@/src/components/layout/Sidebar";
// import TopNav from "@/src/components/layout/TopNav";
import type { ReactNode } from "react";


export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Sidebar />

      <div className="min-h-screen pl-64">
        {/* <TopNav /> */}

        <main className="min-h-[calc(100vh-80px)] p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}