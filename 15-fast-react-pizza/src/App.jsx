import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Error from './ui/Error';

import Cart from './featrues/cart/Cart';
import Menu, { loader as menuLoader } from './featrues/menu/Menu';
import CreateOrder, {
  action as createOrderAction,
} from './featrues/order/CreateOrder';
import Order, { loader as orderLoader } from './featrues/order/Order';
import AppLayout from './ui/AppLayout';

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
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader, // Step2: Provide the loader
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
