import type { AppRole } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  principalId: string | null;
  role: AppRole;
  name: string;
  isAuthenticated: boolean;
  setAuth: (principalId: string, role: AppRole, name: string) => void;
  setRole: (role: AppRole) => void;
  setName: (name: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      principalId: null,
      role: "unknown",
      name: "",
      isAuthenticated: false,
      setAuth: (principalId, role, name) =>
        set({ principalId, role, name, isAuthenticated: true }),
      setRole: (role) => set({ role }),
      setName: (name) => set({ name }),
      clearAuth: () =>
        set({
          principalId: null,
          role: "unknown",
          name: "",
          isAuthenticated: false,
        }),
    }),
    {
      name: "vms-auth-store",
    },
  ),
);
