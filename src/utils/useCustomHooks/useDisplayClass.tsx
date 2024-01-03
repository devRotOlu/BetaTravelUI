import { useEffect, useContext } from "react";

import { appContext } from "../../context/ContextWrapper";

const useDisplayClass = (elementId: string) => {
  const appData = useContext(appContext);
  const { displayClass } = appData;
  useEffect(() => {
    const eventFunc = () => {
      document.getElementById(elementId)?.classList.remove(displayClass);
    };
    window.addEventListener("click", eventFunc);
    return () => {
      window.removeEventListener("click", eventFunc);
    };
  }, []);
  return;
};

export default useDisplayClass;
