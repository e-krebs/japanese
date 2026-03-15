import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import { KanaContextProvider, SelectedKanasContextProvider } from "./hooks";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KanaContextProvider>
      <SelectedKanasContextProvider>
        <App />
      </SelectedKanasContextProvider>
    </KanaContextProvider>
  </StrictMode>,
);
