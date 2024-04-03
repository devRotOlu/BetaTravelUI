import { useRef, useContext } from "react";
import { Outlet } from "react-router";

import NavbarCancel from "./navbar/NavbarCancel";
import NavbarExpand from "./navbar/NavbarExpand";
import NavbarOffCanvas from "./navbar/NavbarOffCanvas";
import User from "./authorizedUserResources/User";
import UserNavigation from "./navigation/UserNavigation";
import AuthorizedUserNavigation from "./navigation/AuthorizedUserNavigation";
import NavBrand from "./navbar/NavBrand";

import { appContext } from "../context/ContextWrapper";

const ResourcePages = () => {
  const { isSignedIn } = useContext(appContext);

  const cancelNavbarRef = useRef<HTMLButtonElement>(null!);
  const handleNavbar = () => {
    cancelNavbarRef.current.click();
  };
  return (
    <>
      {!isSignedIn && (
        <NavbarOffCanvas linkWidth={100} direction="end">
          <>
            <NavBrand />
            <NavbarExpand />
          </>
          <>
            <NavBrand />
            <NavbarCancel ref={cancelNavbarRef} />
          </>
          <UserNavigation handleNavbar={handleNavbar} />
        </NavbarOffCanvas>
      )}
      {isSignedIn && (
        <NavbarOffCanvas linkWidth={75} direction="start">
          <>
            <NavbarExpand />
            <User />
          </>
          <>
            <span onClick={() => handleNavbar()}>
              <NavBrand />
            </span>
            <NavbarCancel ref={cancelNavbarRef} />
          </>
          <AuthorizedUserNavigation handleNavbar={handleNavbar} />
        </NavbarOffCanvas>
      )}
      <Outlet />
    </>
  );
};

export default ResourcePages;
