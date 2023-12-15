import { FormInputProps } from "../../utils/data";

const FormInput = ({ inputType, inputClass, inputValue, inputName, children, inputLabel, placeHolder, handleChange }: FormInputProps) => {
  return (
    <label htmlFor={inputName} className={`appInputs ${inputClass}`}>
      {inputLabel}
      <input id={inputName} name={inputName} value={inputValue} type={inputType} placeholder={placeHolder} onChange={handleChange} />
      {children}
    </label>
  );
};

export default FormInput;
