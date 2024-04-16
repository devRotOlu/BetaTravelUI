import { useRef, useLayoutEffect, useState, MutableRefObject } from "react";

export type ImageData = {
  imageRef: MutableRefObject<HTMLImageElement | null>;
  imageHeight: number;
};

const useImageHeight = (): ImageData => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageHeight, setImageHeight] = useState(0);
  useLayoutEffect(() => {
    const imageLoadListener = () => {
      const height = imageRef.current!.parentElement!.clientHeight;
      setImageHeight(() => height);
    };
    if (imageRef.current) {
      imageRef.current.addEventListener("load", imageLoadListener);
    }
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", imageLoadListener);
      }
    };
  }, []);
  return { imageRef, imageHeight };
};

export default useImageHeight;
