import React from "react";

import { WrapperProps } from "../../utils/data";

const Wrapper = <E extends React.ElementType = "div">({ children, as }: WrapperProps<E>) => {
  const Component = as || "div";
  return (
    <Component className="roomBooking" style={{ backgroundColor: "white" }}>
      {children}
    </Component>
  );
};

export default Wrapper;
