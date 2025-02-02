import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import XRouters from "./pages/router";
import { Providers } from "./components/providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <XRouters />
    </Providers>
  </StrictMode>,
);
