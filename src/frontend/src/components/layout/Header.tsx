import { NotificationBell } from "@/components/notifications/NotificationBell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationStore } from "@/stores/notificationStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, LogOut, Menu, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { name, role, isAuthenticated, logout } = useAuth();
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const navigate = useNavigate();

  const getRoleLabel = () => {
    if (role === "volunteer") return "Volunteer";
    if (role === "ngo") return "NGO Admin";
    if (role === "superAdmin") return "Super Admin";
    return "Guest";
  };

  const getInitials = (n: string) =>
    n
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?";

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border shadow-card">
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              type="button"
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
              aria-label="Open navigation menu"
              data-ocid="header.menu_button"
            >
              <Menu size={20} />
            </button>
          )}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.logo_link"
          >
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  d="M12 2L3 7v10l9 5 9-5V7L12 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                />
              </svg>
            </div>
            <span className="font-display font-bold text-foreground text-base hidden sm:block group-hover:text-primary transition-colors">
              VMS Connect
            </span>
          </Link>
        </div>

        {/* Right: Theme + Notifications + User */}
        <div className="flex items-center gap-1.5">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
            aria-label="Toggle theme"
            data-ocid="header.theme_toggle"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          {isAuthenticated && <NotificationBell unreadCount={unreadCount} />}

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-muted transition-smooth"
                  data-ocid="header.user_menu_button"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {getInitials(name || getRoleLabel())}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground leading-tight max-w-[100px] truncate">
                      {name || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground leading-tight">
                      {getRoleLabel()}
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className="text-muted-foreground hidden md:block"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {role === "volunteer" && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/volunteer/profile"
                      data-ocid="header.profile_link"
                    >
                      <User size={14} className="mr-2" /> Profile
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                  data-ocid="header.logout_button"
                >
                  <LogOut size={14} className="mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" asChild data-ocid="header.login_button">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
