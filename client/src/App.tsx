import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./services/provider/theme-provider";
import { ThemeSwitch } from "./components/theme-switch";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute top-6 right-6">
        <ThemeSwitch />
      </div>
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
