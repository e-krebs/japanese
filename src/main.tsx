import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import { KanaContextProvider } from "./hooks";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KanaContextProvider>
      <App />
    </KanaContextProvider>
  </StrictMode>,
);
