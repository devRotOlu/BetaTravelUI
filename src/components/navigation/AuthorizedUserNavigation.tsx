import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import LogoutBtn from "../LogoutBtn";

import { useRouteEventListener } from "../../utils/useCustomHooks/useRouteEventListener";
import { NavigationProps } from "../../utils/data";

const links1 = ["dashboard", "account", "chat"];
const icons = ["material-symbols-light:space-dashboard-sharp", "ic:baseline-account-circle", "fluent-mdl2:office-chat-solid"];
const linkNames = ["Dashboard", " Account", "Chat"];

const AuthorizedUserNavigation = ({ handleNavbar }: NavigationProps) => {
  const currentRoute = useRouteEventListener(links1, 2);
  const userPages = links1.map((link, index) => {
    const icon = icons[index];
    const linkName = linkNames[index];
    const isRoute = currentRoute === link;
    return (
      <li onClick={() => handleNavbar()} className="d-flex authUserLink userPage" key={index} style={{ paddingLeft: !isRoute ? "16px" : "0", gap: isRoute ? "13.5px" : "0" }}>
        {isRoute && <span style={{ height: "100%", width: "2.5px", backgroundColor: "orange" }} />}
        <Link to={`/${link}`}>
          <Icon icon={icon} />
          {linkName}
        </Link>
      </li>
    );
  });
  return (
    <div className="d-flex flex-column gap-5 h-100 w-100 pe-5 ps-5" style={{ backgroundColor: "darkblue", color: "white", paddingTop: "50px", paddingBottom: "50px" }}>
      <ul className="d-flex flex-column p-0 flex-grow-1 justify-content-start gap-4">{userPages}</ul>
      <ul className="d-flex flex-column p-0 ps-3 flex-grow-1 justify-content-start gap-4">
        <li onClick={() => handleNavbar()} className="authUserLink ">
          <Link to="/dashboard">Visa</Link>
        </li>
        <li onClick={() => handleNavbar()} className="authUserLink">
          <Link to="/dashboard">Packages</Link>
        </li>
        <li onClick={() => handleNavbar()} className="authUserLink">
          <Link to="/dashboard">Become an affiliate</Link>
        </li>
      </ul>
      <LogoutBtn btnClass="navLogout" />
    </div>
  );
};

export default AuthorizedUserNavigation;
