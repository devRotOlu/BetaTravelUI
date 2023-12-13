import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const getRouteLocationIndex = (pathName: string, links: { link: string; icon?: string; linkName: string }[]) => {
  return links.findIndex((item) => {
    const { link } = item;
    return pathName.split("/")[1] === "" || pathName.split("/")[1].includes(link);
  });
};

export const useRouteEventListener = (links: { link: string; icon?: string; linkName: string }[]) => {
  const location = useLocation();

  const { pathname } = location;

  var initialRouteIndex = getRouteLocationIndex(pathname, links);

  initialRouteIndex = initialRouteIndex === -1 ? 0 : initialRouteIndex;

  const routesRef = useRef<HTMLUListElement>(null!);
  const routeIndex = useRef(initialRouteIndex);

  useEffect(() => {
    const possibleRouteIndex = getRouteLocationIndex(pathname, links);
    if (possibleRouteIndex >= 0) {
      routesRef.current.children[routeIndex.current].classList.remove("nav-item-active");
      routesRef.current.children[possibleRouteIndex].classList.add("nav-item-active");
      routeIndex.current = possibleRouteIndex;
    }
  }, [pathname, links]);

  return routesRef;
};
