import type { AuthProvider } from "@refinedev/core";

/**
 * No-auth provider: uygulama giriş/session gerektirmez, her zaman erişime açık.
 */
export const authProvider: AuthProvider = {
  login: async () => ({ success: true, redirectTo: "/" }),
  register: async () => ({ success: true, redirectTo: "/" }),
  logout: async () => ({ success: true, redirectTo: "/" }),
  onError: async () => ({ error: undefined }),
  check: async () => ({ authenticated: true }),
  getPermissions: async () => null,
  getIdentity: async () => null,
};
