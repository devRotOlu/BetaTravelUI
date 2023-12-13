import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import Tab from "./Tab";
import List from "./List";

import { useRouteEventListener } from "../../utils/useCustomHooks/useRouteEventListener";
import { homeTabLinks } from "../../utils/data";

const Home = () => {
  const routeRef = useRouteEventListener(homeTabLinks);
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
      <main>
        <Tab className="navTab py-4 px-2 column-gap-3 row-gap-4" ref={routeRef}>
          {links}
        </Tab>
        <form className="bookingsForm container-fluid">
          <Outlet />
        </form>
      </main>
    </div>
  );
};

export default Home;
