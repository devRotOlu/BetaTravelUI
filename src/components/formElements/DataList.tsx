import React, { useRef, useEffect } from "react";

import { InputDropDownProps } from "../../utils/data";

const DataList = React.forwardRef<HTMLInputElement, InputDropDownProps>(({ name, id, children, value, placeHolder, handleChange }: InputDropDownProps, ref) => {
  const handleFocus = () => {
    dataListRef.current.classList.add("_dataListDisplay");
  };
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  const dataListRef = useRef<HTMLDataListElement>(null!);
  useEffect(() => {
    const eventFunc = () => {
      dataListRef.current.classList.remove("_dataListDisplay");
    };
    window.addEventListener("click", eventFunc);
    return () => {
      window.removeEventListener("click", eventFunc);
    };
  }, []);

  return (
    <label htmlFor={id} className="w-100 position-static">
      <input onFocus={handleFocus} onClick={handleClick} autoComplete="off" className="dataListInput w-100 position-static" name={name} value={value} placeholder={placeHolder} id={id} onChange={handleChange} ref={ref} />
      <datalist ref={dataListRef}>{children}</datalist>
    </label>
  );
});

export default DataList;
