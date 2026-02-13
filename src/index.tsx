import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { BACKEND_BASE_URL, AUTH_TOKEN_KEY } from "./constants";

// Attach JWT to all requests to our API
const originalFetch = window.fetch;
window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
  const url = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
  if (url.startsWith(BACKEND_BASE_URL)) {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      init = { ...init, headers: new Headers(init?.headers as HeadersInit) };
      (init!.headers as Headers).set("Authorization", `Bearer ${token}`);
    }
  }
  return originalFetch.call(this, input, init);
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
