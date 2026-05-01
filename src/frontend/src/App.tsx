import { RootLayout } from "@/components/layout/RootLayout";
import { PageLoader } from "@/components/shared/LoadingSpinner";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { useAuthStore } from "@/stores/authStore";
import type { AppRole } from "@/types";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";

// Lazy-load pages
const VolunteerDashboard = lazy(
  () => import("@/pages/volunteer/DashboardPage"),
);
const VolunteerTasks = lazy(() => import("@/pages/volunteer/TasksPage"));
const VolunteerMap = lazy(() => import("@/pages/volunteer/MapPage"));
const VolunteerProfile = lazy(() => import("@/pages/volunteer/ProfilePage"));
const NGODashboard = lazy(() => import("@/pages/ngo/DashboardPage"));
const NGOTasks = lazy(() => import("@/pages/ngo/TasksPage"));
const NGOVolunteers = lazy(() => import("@/pages/ngo/VolunteersPage"));
const AdminOverview = lazy(() => import("@/pages/admin/OverviewPage"));
const AdminNGOs = lazy(() => import("@/pages/admin/NGOsPage"));
const AdminUsers = lazy(() => import("@/pages/admin/UsersPage"));

// Role guard component
function RoleGuard({
  allowedRoles,
  children,
}: { allowedRoles: AppRole[]; children: React.ReactNode }) {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) {
    const dest =
      role === "ngo"
        ? "/ngo/dashboard"
        : role === "superAdmin"
          ? "/admin"
          : "/volunteer/dashboard";
    return <Navigate to={dest} />;
  }
  return <>{children}</>;
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </ThemeProvider>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    const { isAuthenticated, role } = useAuthStore();
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (role === "ngo") return <Navigate to="/ngo/dashboard" />;
    if (role === "superAdmin") return <Navigate to="/admin" />;
    return <Navigate to="/volunteer/dashboard" />;
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

// Volunteer routes
const volunteerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/volunteer/dashboard",
  component: () => (
    <RoleGuard allowedRoles={["volunteer"]}>
      <Suspense fallback={<PageLoader />}>
        <VolunteerDashboard />
      </Suspense>
    </RoleGuard>
  ),
});

const volunteerTasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/volunteer/tasks",
  component: () => (
    <RoleGuard allowedRoles={["volunteer"]}>
      <Suspense fallback={<PageLoader />}>
        <VolunteerTasks />
      </Suspense>
    </RoleGuard>
  ),
});

const volunteerMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/volunteer/map",
  component: () => (
    <RoleGuard allowedRoles={["volunteer"]}>
      <Suspense fallback={<PageLoader />}>
        <VolunteerMap />
      </Suspense>
    </RoleGuard>
  ),
});

const volunteerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/volunteer/profile",
  component: () => (
    <RoleGuard allowedRoles={["volunteer"]}>
      <Suspense fallback={<PageLoader />}>
        <VolunteerProfile />
      </Suspense>
    </RoleGuard>
  ),
});

// NGO routes
const ngoDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ngo/dashboard",
  component: () => (
    <RoleGuard allowedRoles={["ngo"]}>
      <Suspense fallback={<PageLoader />}>
        <NGODashboard />
      </Suspense>
    </RoleGuard>
  ),
});

const ngoTasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ngo/tasks",
  component: () => (
    <RoleGuard allowedRoles={["ngo"]}>
      <Suspense fallback={<PageLoader />}>
        <NGOTasks />
      </Suspense>
    </RoleGuard>
  ),
});

const ngoVolunteersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ngo/volunteers",
  component: () => (
    <RoleGuard allowedRoles={["ngo"]}>
      <Suspense fallback={<PageLoader />}>
        <NGOVolunteers />
      </Suspense>
    </RoleGuard>
  ),
});

// Admin routes
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <RoleGuard allowedRoles={["superAdmin"]}>
      <Suspense fallback={<PageLoader />}>
        <AdminOverview />
      </Suspense>
    </RoleGuard>
  ),
});

const adminNGOsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/ngos",
  component: () => (
    <RoleGuard allowedRoles={["superAdmin"]}>
      <Suspense fallback={<PageLoader />}>
        <AdminNGOs />
      </Suspense>
    </RoleGuard>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: () => (
    <RoleGuard allowedRoles={["superAdmin"]}>
      <Suspense fallback={<PageLoader />}>
        <AdminUsers />
      </Suspense>
    </RoleGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  volunteerDashboardRoute,
  volunteerTasksRoute,
  volunteerMapRoute,
  volunteerProfileRoute,
  ngoDashboardRoute,
  ngoTasksRoute,
  ngoVolunteersRoute,
  adminRoute,
  adminNGOsRoute,
  adminUsersRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
