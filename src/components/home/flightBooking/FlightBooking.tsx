import { useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import Tab from "../Tab";
import List from "../List";
import Button from "../../Button";
import QualityCheckMark from "../QualityCheckMark";
import FlightContext from "../../../context/FlightContext";

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
    <FlightContext>
      <Tab ref={routeRef} className="flight_navTab d-flex justify-content-between px-1 mb-4">
        {links}
      </Tab>
      <Outlet />
      <Button buttonLabel="Search Flights" buttonType="submit">
        <span>
          <Icon icon="ion:chevron-forward-outline" />
        </span>
      </Button>
      <QualityCheckMark />
    </FlightContext>
  );
};

export default FlightBooking;
