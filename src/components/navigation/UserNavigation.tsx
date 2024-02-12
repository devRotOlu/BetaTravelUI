import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import { NavigationProps } from "../../utils/data";

const UserNavigation = ({ handleNavbar }: NavigationProps) => {
  const icon = "ion:chevron-forward-outline";

  return (
    <ul className="navbar-nav justify-content-end flex-grow-1  row-gap-3 pt-5 ps-3 pe-3">
      <li onClick={handleNavbar} className="nav-item">
        <Link to="/">
          Visa
          <Icon icon={icon} />
        </Link>
      </li>
      <li onClick={handleNavbar} className="nav-item">
        <Link to="/">
          Vacation Packages
          <Icon icon={icon} />
        </Link>
      </li>
      <li onClick={handleNavbar} className="nav-item">
        <Link to="/">
          Become an affiliate
          <Icon icon={icon} />
        </Link>
      </li>
      <li onClick={handleNavbar} className="nav-item">
        <Link to="sign-in">
          Login
          <Icon icon={icon} />
        </Link>
      </li>
      <li onClick={handleNavbar} className="nav-item">
        <Link to="/sign-up">
          Create account
          <Icon icon={icon} />
        </Link>
      </li>
    </ul>
  );
};

export default UserNavigation;
