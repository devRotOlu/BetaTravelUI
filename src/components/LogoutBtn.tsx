import { useContext } from "react";
import { Icon } from "@iconify/react";

import { appContext } from "../context/ContextWrapper";
import { LogoutBtnProps } from "../utils/data";

const LogoutBtn = ({ btnClass }: LogoutBtnProps) => {
  const { setIsSignedIn } = useContext(appContext);
  return (
    <button type="button" className={btnClass} onClick={() => setIsSignedIn(false)}>
      <span className="d-flex justify-content-between align-items-center pe-1 ps-1 w-100 h-100">
        <Icon icon="material-symbols-light:logout" /> Logout
      </span>
    </button>
  );
};

export default LogoutBtn;
