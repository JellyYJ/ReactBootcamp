import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// import { CitiesProvider } from "./contexts/CitiesContext";
import { CitiesProvider } from "./contexts/AdvancedCitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// Implement Lazy Loading
// const Homepage = lazy("./pages/Homepage");
// const Product = lazy("./pages/Product");
// const Pricing = lazy("./pages/Pricing");
// const Login = lazy("./pages/Login");
// const PageNotFound = lazy("./pages/PageNotFound");
// const AppLayout = lazy("./pages/AppLayout");
// const ProtectedRoute = lazy("./pages/ProtectedRoute");

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

function AppContext() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage />} />;
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="product" element={<Product />} />;
              <Route path="pricing" element={<Pricing />} />;
              <Route path="login" element={<Login />} />;
              <Route path="*" element={<PageNotFound />} />;
            </Routes>
          </BrowserRouter>
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default AppContext;
