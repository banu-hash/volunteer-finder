import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, role } = useAuth();
  const hasSidebar = isAuthenticated && role !== "unknown";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        {hasSidebar && (
          <>
            <Sidebar variant="desktop" />
            <Sidebar
              variant="mobile"
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </>
        )}
        <main className="flex-1 min-w-0 pb-16 lg:pb-0">{children}</main>
      </div>
      {hasSidebar && <MobileNav />}
      <Toaster richColors position="top-right" />
    </div>
  );
}
