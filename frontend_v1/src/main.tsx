import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routes/router";
import { AuthProvider } from "./providers/auth-provider";
import { ToastProvider } from "./components/toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </ToastProvider>
  </StrictMode>
);