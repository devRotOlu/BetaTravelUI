import React, { useEffect } from "react";

import { DropDownProps } from "../../utils/data";
import useDisplayClass from "../../utils/useCustomHooks/useDisplayClass";

const DataList = React.forwardRef<HTMLInputElement, DropDownProps>(({ name, inputId, children, value, placeHolder, handleChange, handleFocus, dropDownId, dropDownClass }: DropDownProps, ref) => {
  useDisplayClass(dropDownId!);
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  return (
    <label htmlFor={inputId} className="w-100 position-static">
      <input onFocus={handleFocus} onClick={handleClick} autoComplete="off" className="dataListInput w-100 position-static" name={name} value={value} placeholder={placeHolder} id={inputId} onChange={handleChange} ref={ref} />
      <datalist className={`appDataList ${dropDownClass}`} id={dropDownId}>
        {children}
      </datalist>
    </label>
  );
});

export default DataList;
