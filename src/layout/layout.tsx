import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import HiddenNavbarMenu from "../components/hidden-navbar-menu";
import { useState } from "react";

export default function Layout() {
  const [hiddenMenu, setHiddenMenu] = useState(false);

  function toggleMenu() {
    setHiddenMenu((prev) => !prev);
  }

  return (
    <>
      <Navbar toggleMenu={toggleMenu} />
      <HiddenNavbarMenu toggleMenu={toggleMenu} hiddenMenu={hiddenMenu} />
      <Outlet />
    </>
  );
}