import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import Loading from "./Loading";
import CartOverview from "../featrues/cart/CartOverview";

function AppLayout() {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loading />}

      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
