import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate, Outlet } from "react-router-dom";

import Tab from "./Tab";
import List from "./List";
import OffCanvasNavbar from "../OffCanvasNavbar";

import { useRouteEventListener } from "../../utils/useCustomHooks/useRouteEventListener";
import { homeTabLinks } from "../../utils/data";

const Home = () => {
  const routeRef = useRouteEventListener(homeTabLinks, 2);
  const navigate = useNavigate();
  useEffect(() => navigate("flight"), []);
  const links = homeTabLinks.map(({ link, icon, linkName }, index) => {
    if (index === homeTabLinks.length - 1) {
      const nameSplit = linkName.split(" ");
      return (
        <List key={index}>
          <Link className="nav-link" to={link}>
            <Icon icon={icon} />
            <span>
              {nameSplit[0]}
              <br />
              {nameSplit[1]}
            </span>
          </Link>
        </List>
      );
    }
    return (
      <List key={index}>
        <Link className="nav-link" to={link}>
          <Icon icon={icon} />
          <span>{linkName}</span>
        </Link>
      </List>
    );
  });
  return (
    <div>
      <OffCanvasNavbar />
      <main>
        <Tab className="home_navTab py-4 px-2 column-gap-3 row-gap-4 m-0" ref={routeRef}>
          {links}
        </Tab>
        <form className="bookingsForm container-fluid d-flex flex-column justify-content-center pb-4 py-4">
          <Outlet />
        </form>
      </main>
    </div>
  );
};

export default Home;
