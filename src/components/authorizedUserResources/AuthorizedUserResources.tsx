import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router";

import { appContext } from "../../context/ContextWrapper";

const AuthorizedUserResources = () => {
  const { isSignedIn } = useContext(appContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isSignedIn) navigate("/");
  }, [isSignedIn, navigate]);
  return <Outlet />;
};

export default AuthorizedUserResources;
