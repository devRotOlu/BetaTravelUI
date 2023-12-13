export const getRouteLocationIndex = (pathName: string, links: { link: string; icon?: string; linkName: string }[], split: number) => {
  return links.findIndex((item) => {
    const { link } = item;
    if (pathName.split("/")[split - 1]) {
      return pathName.split("/")[split - 1].includes(link);
    }
    return false;
  });
};
