import { createAuthClient } from "better-auth/react";
import { AUTH_BASE_URL, USER_ROLES } from "@/constants";

export const authClient = createAuthClient({
  baseURL: AUTH_BASE_URL,
  user: {
    additionalFields: {
      role: {
        type: USER_ROLES,
        required: true,
        defaultValue: "student",
        input: true,
      },
      department: {
        type: "string",
        required: false,
        input: true,
      },
      imageCldPubId: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
});