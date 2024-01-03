import React from "react";

import { DropDownProps } from "../../../utils/data";
import useDisplayClass from "../../../utils/useCustomHooks/useDisplayClass";

const InputDropDown = ({ name, inputId, value, placeHolder, handleChange, dropDownId, children, handleFocus }: DropDownProps) => {
  useDisplayClass(dropDownId!);
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => (event.currentTarget.disabled = false);
  return (
    <label htmlFor={inputId} className="w-100 position-static">
      <input onBlur={handleBlur} onFocus={handleFocus} onClick={handleClick} autoComplete="off" className="dataListInput w-100 position-static" name={name} value={value} placeholder={placeHolder} id={inputId} onChange={handleChange} />
      {children}
    </label>
  );
};

export default InputDropDown;
