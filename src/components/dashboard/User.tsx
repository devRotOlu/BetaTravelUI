import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

import LogoutBtn from "../LogoutBtn";

import boy from "../../assests/boy.png";

const User = () => {
  const [toLogout, setToLogout] = useState(false);
  useEffect(() => {
    const _setToLogout = () => setToLogout(false);
    window.addEventListener("click", _setToLogout);
    return () => window.removeEventListener("click", _setToLogout);
  });
  return (
    <div
      className="d-flex align-items-center gap-2"
      onClick={(e) => {
        e.stopPropagation();
        setToLogout((prevResult) => !prevResult);
      }}
      style={{ cursor: "pointer" }}
    >
      <div style={{ width: "40px", height: "fit-content", borderRadius: "100%", backgroundColor: "rgb(245, 244, 244)" }}>
        <img style={{ width: "100%", borderRadius: "inherit" }} src={boy} alt="User" />
      </div>
      <Icon icon="ri:arrow-down-s-line" />
      {toLogout && <LogoutBtn />}
    </div>
  );
};

export default User;
