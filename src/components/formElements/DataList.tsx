import React from "react";

import { DropDownProps } from "../../utils/data";

const DataList = React.forwardRef<HTMLInputElement, DropDownProps>(({ name, inputId, children, value, placeHolder, handleChange, handleFocus, dropDownClass, isFocused }: DropDownProps, ref) => {
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  return (
    <label htmlFor={inputId} className="w-100 position-static h-100">
      <input onFocus={handleFocus} onClick={handleClick} autoComplete="off" className="h-100 dataListInput w-100 position-static" name={name} value={value} placeholder={placeHolder} id={inputId} onChange={handleChange} ref={ref} />
      {isFocused && <datalist className={`appDataList ${dropDownClass}`}>{children}</datalist>}
    </label>
  );
});

export default DataList;
