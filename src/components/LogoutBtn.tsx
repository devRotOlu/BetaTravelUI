import { useContext } from "react";
import { Icon } from "@iconify/react";

import Button from "./Button";

import { appContext } from "../context/ContextWrapper";

const LogoutBtn = () => {
  const { setIsSignedIn } = useContext(appContext);

  return (
    <Button buttonType="button" buttonClass="logout" handleClick={() => setIsSignedIn(false)}>
      <span className="d-flex justify-content-between align-items-center pe-1 ps-1 w-100 h-100">
        <Icon icon="material-symbols-light:logout" /> Logout
      </span>
    </Button>
  );
};

export default LogoutBtn;
