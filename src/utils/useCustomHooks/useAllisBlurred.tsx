import { useEffect } from "react";

const useAllisBlurred = (eventFunc: () => void) => {
  useEffect(() => {
    window.addEventListener("click", eventFunc);
    return () => {
      window.removeEventListener("click", eventFunc);
    };
  }, [eventFunc]);
  return;
};

export default useAllisBlurred;
