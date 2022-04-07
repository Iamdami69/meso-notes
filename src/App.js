import { useContext } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes/AppRoutes";
import { ThemeContext } from "./Context/ThemeContext/ThemeContext";

export default function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <main
      className="App"
      style={{ backgroundColor: theme.background, color: theme.color }}
    >
      <AppRoutes />
    </main>
  );
}
