import "@fontsource-variable/ibm-plex-sans/wght.css";
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
