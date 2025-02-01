import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import XRouters from "./pages/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <XRouters />
  </StrictMode>,
);
