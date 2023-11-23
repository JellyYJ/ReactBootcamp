import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet /> {/* This is where child routes will be rendered */}
      </Main>

      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
