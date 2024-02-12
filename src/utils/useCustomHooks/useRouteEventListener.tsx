import { useState } from "react";
import { useLocation } from "react-router-dom";

import { getRoute } from "../helperFunctions/helperFunction";

export const useRouteEventListener = (links: string[], split: number) => {
  const location = useLocation();

  const { pathname } = location;

  var _route = getRoute(pathname, links, split);

  const [currentPathName, setCurrentPathName] = useState(pathname);
  const [currentRoute, setCurrentRoute] = useState(_route);

  if (pathname !== currentPathName) {
    setCurrentPathName(pathname);
    setCurrentRoute(_route);
  }
  return currentRoute;
};
