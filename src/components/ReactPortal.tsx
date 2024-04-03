import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

import { appendModalWrapperToBody } from "../utils/helperFunctions/helperFunction";
import { ReactPortalProps } from "../utils/data";

const ReactPortal = ({ wrapperId, children }: ReactPortalProps) => {
  const [modalWrapperRef, setModalWrapperRef] = useState<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    const modalWrapper = appendModalWrapperToBody(wrapperId);
    setModalWrapperRef(modalWrapper);

    return () => {
      if (modalWrapper.parentNode) {
        modalWrapper.parentNode.removeChild(modalWrapper);
      }
    };
  }, [wrapperId]);

  if (!modalWrapperRef) {
    return null;
  }

  return createPortal(children, modalWrapperRef);
};

export default ReactPortal;
