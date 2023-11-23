import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<Navigate replace to="dashboard"></Navigate>}
            />
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Bookings />} path="bookings" />
            <Route element={<Cabins />} path="cabins" />
            <Route element={<Settings />} path="settings" />
            <Route element={<Users />} path="users" />
            <Route element={<Account />} path="account" />
          </Route>

          <Route element={<Login />} path="login" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
