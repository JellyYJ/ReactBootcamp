import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route
                index
                element={<Navigate replace to="dashboard"></Navigate>}
              />
              <Route element={<Dashboard />} path="dashboard" />
              <Route element={<Bookings />} path="bookings" />
              <Route element={<Booking />} path="bookings/:bookingId" />
              <Route element={<CheckIn />} path="checkin/:bookingId" />

              <Route element={<Cabins />} path="cabins" />
              <Route element={<Settings />} path="settings" />
              <Route element={<Users />} path="users" />
              <Route element={<Account />} path="account" />
            </Route>

            <Route element={<Login />} path="login" />
            <Route element={<PageNotFound />} path="*" />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
