import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import LogoutBtn from "../LogoutBtn";

const DashboardNavigation = () => {
  return (
    <div className="d-flex flex-column justify-content-between" style={{ backgroundColor: "darkblue" }}>
      <ul className="d-flex flex-column gap-2">
        <li>
          <Icon icon="material-symbols-light:space-dashboard-outline-sharp" />
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Icon icon="codion:account" />
          <Link to="/dashboard">Account</Link>
        </li>
        <li>
          <Icon icon="tdesign:chat-double" />
          <Link to="/dashboard">Chat</Link>
        </li>
      </ul>
      <ul className="d-flex flex-column gap-2">
        <li>
          <Link to="/dashboard">Visa</Link>
        </li>
        <li>
          <Link to="/dashboard">Packages</Link>
        </li>
        <li>
          <Link to="/dashboard">Become an affiliate</Link>
        </li>
      </ul>
      <LogoutBtn />
    </div>
  );
};

export default DashboardNavigation;
