import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./featrues/menu/Menu";
import Cart from "./featrues/cart/Cart";
import CreateOrder from "./featrues/order/CreateOrder";
import Order from "./featrues/order/Order";
import AppLayout from "./ui/AppLayout";

/* Fetching Data with Loaders
   1: Create Loaders
   2. Provide the loader
   3. Custom Hook to provide data for the page
*/
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, // Step2: Provide the loader
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
