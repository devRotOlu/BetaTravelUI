import React, { useRef, useEffect } from "react";

import { InputDropDownProps } from "../../utils/data";

const DropDown = ({ name, id, children, value, placeHolder, handleChange }: InputDropDownProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const listRef = useRef<HTMLUListElement>(null!);
  useEffect(() => {
    const eventFunc = () => {
      listRef.current.classList.remove("_dataListDisplay");
    };
    window.addEventListener("click", eventFunc);
    return () => {
      window.removeEventListener("click", eventFunc);
    };
  }, []);
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  const handleFocus = () => {
    listRef.current.classList.add("_dataListDisplay");
    inputRef.current.disabled = true;
  };
  const handleBlur = () => (inputRef.current.disabled = false);
  return (
    <label htmlFor={id} className="w-100 position-static">
      <input onBlur={handleBlur} onFocus={handleFocus} onClick={handleClick} autoComplete="off" className="dataListInput w-100 position-static" name={name} value={value} placeholder={placeHolder} id={id} onChange={handleChange} ref={inputRef} />
      <ul ref={listRef} className="roomBooking flex-column gap-3" style={{ backgroundColor: "white" }}>
        {children}
      </ul>
    </label>
  );
};

export default DropDown;
