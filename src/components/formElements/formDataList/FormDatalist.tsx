import { FormDatalistProps } from "../../../utils/data";

const FormDatalist = ({ name, list, id, children, value, placeHolder, handleChange }: FormDatalistProps) => {
  return (
    <label htmlFor={id} className="w-100">
      <input className="dataListInput w-100" name={name} value={value} placeholder={placeHolder} list={list} id={id} onChange={handleChange} />
      <datalist id={list}>{children}</datalist>
    </label>
  );
};

export default FormDatalist;
