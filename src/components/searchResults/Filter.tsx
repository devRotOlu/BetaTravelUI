import React from "react";

import Button from "../Button";

import { filterTypeProps } from "../../utils/data";

const Filter = ({ children }: filterTypeProps) => {
  return (
    <div className="px-2">
      <div className="py-5 px-4 d-flex justify-content-between" style={{ backgroundColor: "var(--lightBlue)" }}>
        <h2 className="fw-bold">Filter</h2>
        <Button buttonClass="filterClearAll fw-bold" buttonType="button" buttonLabel="Clear all" />
      </div>
      <div className="w-100 my-3">{children}</div>
    </div>
  );
};

export default Filter;
