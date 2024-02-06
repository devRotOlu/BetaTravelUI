import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const AppNavigation = () => {
  const icon = "ion:chevron-forward-outline";

  return (
    <ul className="navbar-nav justify-content-end flex-grow-1  row-gap-3">
      <li className="nav-item">
        <Link to="/">
          Visa
          <Icon icon={icon} />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/">
          Vacation Packages
          <Icon icon={icon} />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/">
          Become an affiliate
          <Icon icon={icon} />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="sign-in">
          Login
          <Icon icon={icon} />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/sign-up">
          Create account
          <Icon icon={icon} />
        </Link>
      </li>
    </ul>
  );
};

export default AppNavigation;
