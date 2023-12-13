import React from "react";

import { TabProps } from "../../utils/data";

const Tab = React.forwardRef<HTMLUListElement, TabProps>(({ children, ...rest }: TabProps, ref) => {
  return (
    <ul {...rest} ref={ref}>
      {children}
    </ul>
  );
});
export default Tab;
