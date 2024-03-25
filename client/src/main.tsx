import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster } from "./components/ui/sonner.tsx";

// pages
import App from "./App.tsx";
import LoginPage from "./pages/(auth)/login-page.tsx";
import RegisterPage from "./pages/(auth)/resigter-page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store, { useAppSelector } from "./services/state/store.ts";
import ErrorPage from "./pages/error-page.tsx";
import Private from "./components/private.tsx";
import AdminLayout from "./pages/(dashboard)/dashboard-layout.tsx";
import { useRefresh } from "./services/api/auth.tsx";
import { ThemeProvider } from "./services/provider/theme-provider.tsx";
import AllUsersPage from "./pages/(dashboard)/user/all-users-page.tsx";
import { selectCurrentToken } from "./services/state/authSlice.ts";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

// eslint-disable-next-line react-refresh/only-export-components
function Index() {
  const refresh = useRefresh();
  const token = useAppSelector(selectCurrentToken);

  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,

      children: [
        {
          loader: async () => {
            if (!token) {
              await refresh();
            }
            return null;
          },
          children: [
            {
              path: "/",
              element: <App />,
              children: [],
            },
            // Dashboard
            {
              element: <Private />,
              children: [
                {
                  path: "/dashboard",
                  element: <AdminLayout />,
                  children: [
                    {
                      index: true,
                      element: <AllUsersPage />,
                    },
                  ],
                },
              ],
            },
          ],
        },

        // Auth
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Index />
          </TooltipProvider>
          <Toaster pauseWhenPageIsHidden position="top-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
