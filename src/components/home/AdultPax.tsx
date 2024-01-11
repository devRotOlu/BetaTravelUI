import React from "react";

import { PaxProps } from "../../utils/data";

const AdultPax = ({ children }: PaxProps) => {
  return (
    <span className="d-flex justify-content-between">
      <span>Adult</span>
      {children}
    </span>
  );
};

export default AdultPax;
