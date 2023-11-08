import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import Loading from "./Loading";
import CartOverview from "../featrues/cart/CartOverview";

function AppLayout() {
  const navigation = useNavigation();
  // console.log(navigation);
  // this navigation is UNIVERSAL, therefore the loading whenever there is a loading in the app
  const isLoading = navigation.state === "loading";

  return (
    <div>
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
