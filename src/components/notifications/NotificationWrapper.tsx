import React, { useLayoutEffect, useRef, useState } from "react";

type NotificationProps = {
  children: React.ReactNode;
};

const getLength = () => {
  const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
  const value = window.visualViewport!.height / 2;
  return scrollTop + value;
};

const NotificationWrapper = ({ children }: NotificationProps) => {
  const [marginTop, setMarginTop] = useState(0);
  const divRef = useRef<HTMLDivElement>(null!);
  useLayoutEffect(() => {
    const value = divRef.current.clientHeight / 2;
    setMarginTop(getLength() - value);
  }, []);
  return (
    <div className="notificationWrapper">
      <div className="notification" ref={divRef} style={{ marginTop: `${marginTop}px` }}>
        {children}
      </div>
    </div>
  );
};

export default NotificationWrapper;
