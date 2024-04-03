export const getRoute = (pathName: string, links: string[], split: number): string => {
  const _links = links.filter((link) => {
    if (pathName.split("/")[split - 1]) return pathName.split("/")[split - 1].includes(link);
    return false;
  });
  if (_links.length) return _links[0];
  return "";
};

export const appendModalWrapperToBody = (wrapperId: string) => {
  const modalWrapper = document.createElement("div");
  modalWrapper.className = "modal";
  modalWrapper.id = wrapperId;
  document.body.appendChild(modalWrapper);
  return modalWrapper;
};
