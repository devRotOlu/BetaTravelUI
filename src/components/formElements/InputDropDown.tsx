import React from "react";

import { DropDownProps } from "../../utils/data";

const InputDropDown = ({ name, inputId, value, placeHolder, handleChange, children, handleFocus, inputClass, isFocused }: DropDownProps) => {
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => (event.currentTarget.disabled = false);
  return (
    <label htmlFor={inputId} className="w-100 position-static h-100">
      <input onBlur={handleBlur} onFocus={handleFocus} onClick={handleClick} autoComplete="off" className={`dataListInput w-100 position-static h-100 ${inputClass}`} name={name} value={value} placeholder={placeHolder} id={inputId} onChange={handleChange} />
      {isFocused && <>{children}</>}
    </label>
  );
};

export default InputDropDown;
