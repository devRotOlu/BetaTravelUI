import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate, Outlet } from "react-router-dom";

import Tab from "./Tab";

import { useRouteEventListener } from "../../utils/useCustomHooks/useRouteEventListener";
import { homeTabLinks } from "../../utils/data";

const _links = homeTabLinks.map(({ link }) => link);

const Home = () => {
  const currentRoute = useRouteEventListener(_links, 2);
  const navigate = useNavigate();
  useEffect(() => navigate("flight"), []);
  const links = homeTabLinks.map(({ link, icon, linkName }, index) => {
    const borderBottom = link === currentRoute ? "solid 2px darkblue" : "";
    const color = link === currentRoute ? "darkblue" : "unset";
    if (index === homeTabLinks.length - 1) {
      const nameSplit = linkName.split(" ");
      return (
        <li className="nav-item" key={index} style={{ borderBottom, color }}>
          <Link className="nav-link" to={link}>
            <Icon icon={icon} />
            <span>
              {nameSplit[0]}
              <br />
              {nameSplit[1]}
            </span>
          </Link>
        </li>
      );
    }
    return (
      <li className="nav-item" key={index} style={{ borderBottom, color }}>
        <Link className="nav-link" to={link}>
          <Icon icon={icon} />
          <span>{linkName}</span>
        </Link>
      </li>
    );
  });
  return (
    <main>
      <Tab className="home_navTab py-4 px-2 column-gap-3 row-gap-4 m-0">{links}</Tab>
      <form className="bookingsForm container-fluid d-flex flex-column justify-content-center pb-4 py-4">
        <Outlet />
      </form>
    </main>
  );
};

export default Home;
