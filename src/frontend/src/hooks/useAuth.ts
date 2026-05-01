import { useAuthStore } from "@/stores/authStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { role, name, principalId, setAuth, clearAuth } = useAuthStore();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    clearAuth();
    queryClient.clear();
  };

  const principalStr = identity?.getPrincipal().toString() ?? null;

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    principalId: principalStr ?? principalId,
    role,
    name,
    login: handleLogin,
    logout: handleLogout,
    setAuth,
    clearAuth,
  };
}
