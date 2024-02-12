export const getRoute = (pathName: string, links: string[], split: number): string => {
  const _links = links.filter((link) => {
    if (pathName.split("/")[split - 1]) return pathName.split("/")[split - 1].includes(link);
    return false;
  });
  if (_links.length) return _links[0];
  return "";
};
