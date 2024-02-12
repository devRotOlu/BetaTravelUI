import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import Tab from "../Tab";
import Button from "../../Button";
import QualityCheckMark from "../QualityCheckMark";
import FlightContext from "../../../context/FlightContext";

import { flightTabLinks } from "../../../utils/data";
import { useRouteEventListener } from "../../../utils/useCustomHooks/useRouteEventListener";

const _links = flightTabLinks.map(({ link }) => link);

const FlightBooking = () => {
  const currentRoute = useRouteEventListener(_links, 3);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentRoute) navigate(currentRoute);
    else navigate("round-trip");
  }, []);

  const links = flightTabLinks.map(({ link, linkName }, index) => {
    const backgroundColor = currentRoute === link ? "white" : "";
    const color = currentRoute === link ? "darkblue" : "";
    const paddingLeft = currentRoute === link ? "15px" : "";
    const paddingRight = currentRoute === link ? "15px" : "";
    return (
      <li className="nav-item" key={index} style={{ fontSize: "14px", color, backgroundColor, borderRadius: "2px", paddingLeft, paddingRight }}>
        <Link className="nav-link" to={link}>
          <span>{linkName}</span>
        </Link>
      </li>
    );
  });
  return (
    <FlightContext>
      <Tab className="flight_navTab d-flex justify-content-between px-1 mb-4">{links}</Tab>
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
