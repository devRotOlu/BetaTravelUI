import { useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Tab from "../Tab";
import QualityCheckMark from "../QualityCheckMark";

import { flightTabLinks } from "../../../utils/data";
import { useRouteEventListener } from "../../../utils/useCustomHooks/useRouteEventListener";
import { appContext } from "../../../context/ContextWrapper";

const _links = flightTabLinks.map(({ link }) => link);

const FlightBooking = () => {
  const currentRoute = useRouteEventListener(_links, 3);
  const navigate = useNavigate();
  const appData = useContext(appContext);
  const { flightRoute, setFlightRoute } = appData;

  useEffect(() => {
    if (!currentRoute) {
      if (flightRoute) navigate(flightRoute);
      else navigate("round-trip");
    }
  }, [currentRoute, flightRoute, navigate]);

  useEffect(() => {
    if (currentRoute) setFlightRoute(currentRoute);
  }, [currentRoute, setFlightRoute]);

  const links = flightTabLinks.map(({ link, linkName }, index) => {
    const backgroundColor = flightRoute === link ? "white" : "";
    const color = flightRoute === link ? "darkblue" : "";
    const paddingLeft = flightRoute === link ? "15px" : "";
    const paddingRight = flightRoute === link ? "15px" : "";
    return (
      <li className="nav-item" key={index} style={{ fontSize: "14px", color, backgroundColor, borderRadius: "2px", paddingLeft, paddingRight }}>
        <Link className="nav-link" to={link}>
          <span>{linkName}</span>
        </Link>
      </li>
    );
  });
  return (
    <>
      <Tab className="flight_navTab d-flex justify-content-between px-2 pt-4 mb-0">{links}</Tab>
      <Outlet />
      <QualityCheckMark />
    </>
  );
};

export default FlightBooking;
