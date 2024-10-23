import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import ProTubeApp from "./ProTubeApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProTubeApp />
  </StrictMode>
);
