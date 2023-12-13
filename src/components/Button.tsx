import React from "react";

import { ButtonProps } from "../utils/data";

const Button = ({ buttonLabel, buttonClass, buttonType, children }: ButtonProps) => {
  return (
    <button type={buttonType} className={`btn  btn-lg ${buttonClass} text-white`}>
      {buttonLabel}
      {children}
    </button>
  );
};

export default Button;
