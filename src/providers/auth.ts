import type { AuthProvider } from "@refinedev/core";
import { BACKEND_BASE_URL, AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/constants";
import type { User } from "@/types";

type AuthUser = { id: string; name: string; email: string; role: string };

function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function setStoredAuth(user: AuthUser, token: string) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function clearStoredAuth() {
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const res = await fetch(`${BACKEND_BASE_URL}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        error: {
          name: "Login failed",
          message: data?.message ?? "Invalid email or password",
        },
      };
    }
    setStoredAuth(data.user, data.token);
    return { success: true, redirectTo: "/" };
  },

  register: async ({ email, password, name, role }) => {
    const res = await fetch(`${BACKEND_BASE_URL}auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, role: role ?? "student" }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        error: {
          name: "Registration failed",
          message: data?.message ?? "Registration failed",
        },
      };
    }
    setStoredAuth(data.user, data.token);
    return { success: true, redirectTo: "/" };
  },

  logout: async () => {
    clearStoredAuth();
    return { success: true, redirectTo: "/login" };
  },

  onError: async (error) => {
    if (error?.response?.status === 401) {
      clearStoredAuth();
      return { logout: true, redirectTo: "/login" };
    }
    return { error };
  },

  check: async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      return { authenticated: false, redirectTo: "/login", logout: true };
    }
    const res = await fetch(`${BACKEND_BASE_URL}auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      clearStoredAuth();
      return { authenticated: false, redirectTo: "/login", logout: true };
    }
    if (!res.ok) {
      return { authenticated: false, redirectTo: "/login", logout: true };
    }
    const data = await res.json().catch(() => ({}));
    if (data?.user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
    }
    return { authenticated: true };
  },

  getPermissions: async () => {
    const u = getStoredUser();
    return u?.role ? { role: u.role } : null;
  },

  getIdentity: async () => {
    const u = getStoredUser();
    if (!u) return null;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
    } as User;
  },
};
