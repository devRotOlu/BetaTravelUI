import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import LogoutBtn from "../LogoutBtn";

const AuthorizedUserNavigation = () => {
  return (
    <div className="d-flex flex-column gap-5 h-100 w-100 pe-5 ps-5" style={{ backgroundColor: "darkblue", color: "white", paddingTop: "50px", paddingBottom: "50px" }}>
      <ul className="d-flex flex-column gap-4 p-0">
        <li className="ps-3 authUserLink userPage">
          <Link to="/dashboard">
            <Icon icon="material-symbols-light:space-dashboard-sharp" />
            Dashboard
          </Link>
        </li>
        <li className="ps-3 authUserLink userPage">
          <Link to="/dashboard">
            <Icon icon="ic:baseline-account-circle" />
            Account
          </Link>
        </li>
        <li className="ps-3 authUserLink userPage">
          <Link to="/dashboard">
            <Icon icon="fluent-mdl2:office-chat-solid" />
            Chat
          </Link>
        </li>
      </ul>
      <ul className="d-flex flex-column gap-4 p-0 ps-3">
        <li className="authUserLink ">
          <Link to="/dashboard">Visa</Link>
        </li>
        <li className="authUserLink">
          <Link to="/dashboard">Packages</Link>
        </li>
        <li className="authUserLink">
          <Link to="/dashboard">Become an affiliate</Link>
        </li>
      </ul>
      <LogoutBtn btnClass="navLogout" />
    </div>
  );
};

export default AuthorizedUserNavigation;
