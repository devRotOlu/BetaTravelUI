import React from "react";

import { InputDropDownProps } from "../../../utils/data";

const InputDropDown = React.forwardRef<HTMLInputElement, InputDropDownProps>(({ name, id, children, value, placeHolder, handleChange }: InputDropDownProps, ref) => {
  return (
    <label htmlFor={id} className="w-100 position-static">
      <input autoComplete="off" className="dataListInput w-100 position-static" name={name} value={value} placeholder={placeHolder} id={id} onChange={handleChange} ref={ref} />
      {children}
    </label>
  );
});

export default InputDropDown;
