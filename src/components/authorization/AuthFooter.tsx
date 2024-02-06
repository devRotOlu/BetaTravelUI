import React from "react";
import { Link } from "react-router-dom";

import { AuthFooterProps } from "../../utils/data";

const AuthFooter = ({ label, linkText, link }: AuthFooterProps) => {
  return (
    <div className="d-flex flex-column align-items-center mt-2">
      <span>{label}</span>
      <Link to={link}>{linkText}</Link>
    </div>
  );
};

export default AuthFooter;
