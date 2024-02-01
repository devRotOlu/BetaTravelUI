import React, { SetStateAction, useLayoutEffect, useRef, useState } from "react";

import Button from "../../Button";

type NotificationProps = {
  content: string;
  mount: React.Dispatch<SetStateAction<boolean>>;
};

const getLength = () => {
  const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
  const value = window.visualViewport!.height / 2;
  return scrollTop + value;
};

const Notification = ({ content, mount }: NotificationProps) => {
  const [paddingTop, setPaddingTop] = useState(0);
  const divRef = useRef<HTMLDivElement>(null!);
  useLayoutEffect(() => {
    const value = divRef.current.clientHeight / 2;
    setPaddingTop(getLength() - value);
  }, []);
  return (
    <div className="notificationWrapper" style={{ paddingTop: `${paddingTop}px` }}>
      <div className="notification" ref={divRef}>
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>BetaTravel.com says</p>
        <p>{content}</p>
        <Button buttonType="button" buttonLabel="OK" buttonClass="notificationBtn" handleClick={() => mount(false)} />
      </div>
    </div>
  );
};

export default Notification;
