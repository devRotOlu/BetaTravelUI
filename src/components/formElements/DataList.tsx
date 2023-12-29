import React from "react";

import { DataListProp } from "../../utils/data";

const DataList = React.forwardRef<HTMLDataListElement, DataListProp>(({ children }: DataListProp, ref) => {
  return (
    <datalist ref={ref}>
      <option>CITY, COUNTRY</option>
      {children}
    </datalist>
  );
});

export default DataList;
