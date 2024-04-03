import React from "react";

import { DropDownProps } from "../../utils/data";

const InputDropDown = ({ name, inputId, value, placeHolder, handleChange, children, handleFocus, inputClass, isFocused, readonly, disabled }: DropDownProps) => {
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  return (
    <>
      <label htmlFor={inputId} className="w-100 position-static h-100">
        <input readOnly={readonly} onFocus={handleFocus} onClick={handleClick} className={`dataListInput w-100 h-100 ${inputClass}`} name={name} value={value} placeholder={placeHolder} id={inputId} onChange={handleChange} disabled={disabled} />
        {isFocused && <>{children}</>}
      </label>
    </>
  );
};

export default InputDropDown;
