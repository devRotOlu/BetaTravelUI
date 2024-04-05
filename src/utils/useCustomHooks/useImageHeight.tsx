import { useRef, useLayoutEffect, useState, MutableRefObject } from "react";

export type ImageData = {
  imageRef: MutableRefObject<HTMLImageElement>;
  imageHeight: number;
};

const useImageHeight = (): ImageData => {
  const imageRef = useRef<HTMLImageElement>(null!);
  const [imageHeight, setImageHeight] = useState(0);
  useLayoutEffect(() => {
    const reloadListener = () => {
      const height = imageRef.current.parentElement!.clientHeight;
      setImageHeight(() => height);
    };
    imageRef.current.addEventListener("load", reloadListener);
    return () => imageRef.current.removeEventListener("load", reloadListener);
  }, []);
  return { imageRef, imageHeight };
};

export default useImageHeight;
