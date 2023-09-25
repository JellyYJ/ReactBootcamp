import { Outlet } from "react-router-dom";
import styels from "./Sidebar.module.css";
import AppNav from "../components/AppNav";
import Logo from "./Logo";

function Sidebar() {
  return (
    <div className={styels.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />

      <footer className={styels.footer}>
        <p className={styels.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
