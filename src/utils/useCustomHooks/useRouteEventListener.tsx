import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { getRouteLocationIndex } from "../helperFunctions/helperFunction";

export const useRouteEventListener = (links: { link: string; icon?: string; linkName: string }[], split: number) => {
  const location = useLocation();

  const { pathname } = location;

  var initialRouteIndex = getRouteLocationIndex(pathname, links, split);

  initialRouteIndex = initialRouteIndex === -1 ? 0 : initialRouteIndex;

  const routesRef = useRef<HTMLUListElement>(null!);
  const routeIndex = useRef(initialRouteIndex);

  useEffect(() => {
    const possibleRouteIndex = getRouteLocationIndex(pathname, links, split);
    if (possibleRouteIndex >= 0) {
      routesRef.current.children[routeIndex.current].classList.remove("nav-item-active");
      routesRef.current.children[possibleRouteIndex].classList.add("nav-item-active");
      routeIndex.current = possibleRouteIndex;
    }
  }, [pathname, links, split]);

  return routesRef;
};
