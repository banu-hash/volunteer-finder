import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { AppRole } from "@/types";
import { Link, useRouter } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  MapPin,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function getNavItems(role: AppRole): NavItem[] {
  if (role === "volunteer") {
    return [
      {
        label: "Dashboard",
        href: "/volunteer/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
      {
        label: "My Tasks",
        href: "/volunteer/tasks",
        icon: <ListChecks size={18} />,
      },
      { label: "Task Map", href: "/volunteer/map", icon: <MapPin size={18} /> },
      {
        label: "Profile",
        href: "/volunteer/profile",
        icon: <User size={18} />,
      },
    ];
  }
  if (role === "ngo") {
    return [
      {
        label: "Dashboard",
        href: "/ngo/dashboard",
        icon: <BarChart3 size={18} />,
      },
      { label: "Tasks", href: "/ngo/tasks", icon: <ClipboardList size={18} /> },
      {
        label: "Volunteers",
        href: "/ngo/volunteers",
        icon: <Users size={18} />,
      },
    ];
  }
  if (role === "superAdmin") {
    return [
      { label: "Overview", href: "/admin", icon: <ShieldCheck size={18} /> },
      { label: "NGOs", href: "/admin/ngos", icon: <Building2 size={18} /> },
      { label: "Users", href: "/admin/users", icon: <Users size={18} /> },
    ];
  }
  return [];
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  variant?: "desktop" | "mobile";
}

export function Sidebar({
  isOpen,
  onClose,
  variant = "desktop",
}: SidebarProps) {
  const { role } = useAuth();
  const router = useRouter();
  const navItems = getNavItems(role);
  const currentPath = router.state.location.pathname;

  if (variant === "mobile") {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose?.()}
            role="button"
            tabIndex={-1}
            aria-label="Close sidebar"
          />
        )}
        <aside
          className={cn(
            "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300 flex flex-col",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <span className="font-display font-bold text-foreground text-lg">
              VMS Connect
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
              aria-label="Close menu"
              data-ocid="sidebar.close_button"
            >
              <X size={18} />
            </button>
          </div>
          <SidebarNav
            navItems={navItems}
            currentPath={currentPath}
            onItemClick={onClose}
          />
        </aside>
      </>
    );
  }

  return (
    <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-card border-r border-border sticky top-0 h-screen">
      <div className="px-5 py-5 border-b border-border">
        <span className="font-display font-bold text-foreground text-base tracking-tight">
          Navigation
        </span>
      </div>
      <SidebarNav navItems={navItems} currentPath={currentPath} />
    </aside>
  );
}

function SidebarNav({
  navItems,
  currentPath,
  onItemClick,
}: {
  navItems: NavItem[];
  currentPath: string;
  onItemClick?: () => void;
}) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Sidebar navigation">
      {navItems.map((item, i) => {
        const isActive =
          currentPath === item.href || currentPath.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onItemClick}
            data-ocid={`sidebar.nav.item.${i + 1}`}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
              isActive
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
