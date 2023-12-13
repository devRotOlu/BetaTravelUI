import { FormInputProps } from "../../utils/data";

const FormInput = ({ inputType, inputClass, inputValue, inputName, children, inputLabel }: FormInputProps) => {
  return (
    <label htmlFor={inputName} className={`appInputs text-light ${inputClass}`}>
      {inputLabel}
      <input id={inputName} name={inputName} value={inputValue} className="text-light" type={inputType} />;{children}
    </label>
  );
};

export default FormInput;
