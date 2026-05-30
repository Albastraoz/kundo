import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root not found");
}

hydrateRoot(
  root,
  <StrictMode>
    <App />
  </StrictMode>,
);
