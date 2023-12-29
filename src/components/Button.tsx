import React from "react";

import { ButtonProps } from "../utils/data";

const Button = ({ buttonLabel, buttonClass, buttonType, children, handleClick }: ButtonProps) => {
  return (
    <button onClick={handleClick} type={buttonType} className={`appBtn ${buttonClass}`}>
      {buttonLabel}
      {children}
    </button>
  );
};

export default Button;
