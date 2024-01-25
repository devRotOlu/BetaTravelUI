import React, { SetStateAction } from "react";

import Button from "../../Button";

type NotificationProps = {
  content: string;
  mount: React.Dispatch<SetStateAction<boolean>>;
};

const Notification = ({ content, mount }: NotificationProps) => {
  return (
    <div className="notificationWrapper">
      <div className="notification">
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>BetaTravel.com says</p>
        <p>{content}</p>
        <Button buttonType="button" buttonLabel="OK" buttonClass="notificationBtn" handleClick={() => mount(false)} />
      </div>
    </div>
  );
};

export default Notification;
