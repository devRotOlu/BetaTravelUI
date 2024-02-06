import { FormInputProps } from "../../utils/data";

const FormInput = ({ inputType, inputClass, inputValue, inputName, children, inputLabel, placeHolder, handleChange, checked }: FormInputProps) => {
  return (
    <label htmlFor={inputName} className={`appInputs ${inputClass}`} style={{ position: "relative" }}>
      {inputLabel}
      <input id={inputName} name={inputName} value={inputValue} type={inputType} placeholder={placeHolder} onChange={handleChange} checked={checked} />
      {children}
    </label>
  );
};

export default FormInput;
