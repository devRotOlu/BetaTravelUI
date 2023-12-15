import { useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Tab from "../Tab";
import List from "../List";

import { flightTabLinks } from "../../../utils/data";
import { useRouteEventListener } from "../../../utils/useCustomHooks/useRouteEventListener";
import { appContext } from "../../../context/ContextWrapper";

const FlightBooking = () => {
  const routeRef = useRouteEventListener(flightTabLinks, 3);
  const navigate = useNavigate();
  const appStates = useContext(appContext);
  const { flightLink } = appStates;

  useEffect(() => {
    if (flightLink) navigate(flightLink);
    else navigate("round-trip");
  }, []);

  const links = flightTabLinks.map(({ link, linkName }, index) => {
    return (
      <List key={index}>
        <Link className="nav-link" to={link}>
          <span>{linkName}</span>
        </Link>
      </List>
    );
  });
  return (
    <>
      <Tab ref={routeRef} className="flight_navTab d-flex justify-content-between px-1 mb-4">
        {links}
      </Tab>
      <Outlet />
    </>
  );
};

export default FlightBooking;
