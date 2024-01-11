import React from "react";

import { ChildPaxProps } from "../../utils/data";

const ChildPax = ({ children, label, ageRange }: ChildPaxProps) => {
  return (
    <span className="d-flex justify-content-between">
      <span className="d-flex flex-column">
        <span>{label}</span>
        <span>{ageRange}</span>
      </span>
      {children}
    </span>
  );
};

export default ChildPax;
