import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import type { AppRole } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogIn, Shield } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isInitializing, isLoggingIn, identity } =
    useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const {
    setAuth,
    role: storedRole,
    isAuthenticated: storeAuth,
  } = useAuthStore();

  // After login, fetch role from backend and redirect
  useEffect(() => {
    if (!isAuthenticated || isFetching || !actor || !identity) return;

    const fetchRole = async () => {
      try {
        const principalStr = identity.getPrincipal().toString();
        const isAdmin = await actor.isCallerAdmin().catch(() => false);
        const ngoProfile = await actor.getMyNGOProfile().catch(() => null);

        let appRole: AppRole = "volunteer";
        if (isAdmin) appRole = "superAdmin";
        else if (ngoProfile) appRole = "ngo";

        setAuth(principalStr, appRole, "");

        if (appRole === "volunteer") navigate({ to: "/volunteer/dashboard" });
        else if (appRole === "ngo") navigate({ to: "/ngo/dashboard" });
        else navigate({ to: "/admin" });
      } catch {
        toast.error("Failed to load your profile. Please try again.");
      }
    };

    fetchRole();
  }, [isAuthenticated, isFetching, actor, identity, navigate, setAuth]);

  if (storeAuth && storedRole !== "unknown") {
    const dest =
      storedRole === "ngo"
        ? "/ngo/dashboard"
        : storedRole === "superAdmin"
          ? "/admin"
          : "/volunteer/dashboard";
    navigate({ to: dest });
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-elevated">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            VMS Connect
          </h1>
          <p className="text-muted-foreground text-sm">
            Volunteer Finder System
          </p>
        </div>

        <Card className="shadow-elevated">
          <CardHeader className="pb-4">
            <h2 className="font-display font-semibold text-lg text-foreground">
              Sign in
            </h2>
            <p className="text-sm text-muted-foreground">
              Use Internet Identity to securely sign in
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              size="lg"
              onClick={() => login()}
              disabled={isInitializing || isLoggingIn || isAuthenticated}
              data-ocid="login.primary_button"
            >
              <LogIn size={18} className="mr-2" />
              {isInitializing
                ? "Initializing..."
                : isLoggingIn
                  ? "Signing in..."
                  : isAuthenticated
                    ? "Redirecting..."
                    : "Sign in with Internet Identity"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  New to VMS Connect?
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              asChild
              data-ocid="login.register_link"
            >
              <Link to="/register">Create an account</Link>
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Your identity is secured by{" "}
              <span className="text-primary font-medium">
                Internet Identity
              </span>
              . No email or password needed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
