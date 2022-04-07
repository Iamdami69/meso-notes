import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { NoteContextProvider } from "./Context/NoteContext/NoteContext";
import { ThemeContextProvider } from "./Context/ThemeContext/ThemeContext";
import { UserContextProvider } from "./Context/UserContext/UserContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <NoteContextProvider>
          <App />
        </NoteContextProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  </StrictMode>
);
