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
        icon: <LayoutDashboard size={20} />,
      },
      {
        label: "Tasks",
        href: "/volunteer/tasks",
        icon: <ListChecks size={20} />,
      },
      { label: "Map", href: "/volunteer/map", icon: <MapPin size={20} /> },
      {
        label: "Profile",
        href: "/volunteer/profile",
        icon: <User size={20} />,
      },
    ];
  }
  if (role === "ngo") {
    return [
      {
        label: "Dashboard",
        href: "/ngo/dashboard",
        icon: <BarChart3 size={20} />,
      },
      { label: "Tasks", href: "/ngo/tasks", icon: <ClipboardList size={20} /> },
      {
        label: "Volunteers",
        href: "/ngo/volunteers",
        icon: <Users size={20} />,
      },
    ];
  }
  if (role === "superAdmin") {
    return [
      { label: "Overview", href: "/admin", icon: <ShieldCheck size={20} /> },
      { label: "NGOs", href: "/admin/ngos", icon: <Building2 size={20} /> },
      { label: "Users", href: "/admin/users", icon: <Users size={20} /> },
    ];
  }
  return [];
}

export function MobileNav() {
  const { role } = useAuth();
  const router = useRouter();
  const navItems = getNavItems(role);
  const currentPath = router.state.location.pathname;

  if (navItems.length === 0) return null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border"
      aria-label="Mobile bottom navigation"
    >
      <div
        className="grid h-16"
        style={{ gridTemplateColumns: `repeat(${navItems.length}, 1fr)` }}
      >
        {navItems.map((item, i) => {
          const isActive =
            currentPath === item.href ||
            currentPath.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              to={item.href}
              data-ocid={`mobile-nav.item.${i + 1}`}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-smooth",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn("transition-transform", isActive && "scale-110")}
              >
                {item.icon}
              </span>
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
