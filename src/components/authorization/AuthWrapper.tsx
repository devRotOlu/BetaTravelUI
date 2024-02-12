import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import Button from "../Button";

import travelbeta from "../../assests/travelbeta.png";
import { AuthWrapperProps } from "../../utils/data";

const AuthWrapper = ({ header, children, buttonLabel, handleFormSubmit }: AuthWrapperProps) => {
  return (
    <div>
      <div className="d-flex justify-content-center p-2" style={{ borderBottom: "solid rgb(245, 245, 245) thin" }}>
        <Link to="/">
          <img style={{ width: "100px" }} src={travelbeta} alt="travelBeta" />
        </Link>
      </div>
      <div className="d-flex justify-content-center p-4">
        <h1 style={{ fontSize: "18px" }}>{header}</h1>
      </div>
      <form className="p-4 w-100" onSubmit={handleFormSubmit}>
        {children}
        <Button buttonLabel={buttonLabel} buttonType="submit" buttonClass="signupBtn">
          <span>
            <Icon icon="ion:chevron-forward-outline" />
          </span>
        </Button>
      </form>
    </div>
  );
};

export default AuthWrapper;
