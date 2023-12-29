import { Icon } from "@iconify/react";

import { InputWrapperProps } from "../../../utils/data";

const InputWrapper = ({ icon, label, children, styleClass }: InputWrapperProps) => {
  return (
    <li className={`w-100 position-relative dataListWrap ${styleClass}`} style={{ display: "grid", gridTemplateColumns: "max-content 1fr", gridTemplateRows: "30px 35px" }}>
      <span className="text-secondary" style={{ width: "100%", fontSize: "15px", gridColumn: "2/3", gridRow: "1/2", lineHeight: "30px" }}>
        {label}
      </span>
      <span className="d-flex align-items-center justify-content-center" style={{ gridColumn: "1/2", gridRow: "1/3", width: "40px" }}>
        <Icon style={{ fontSize: "20px" }} icon={icon} />
      </span>
      {children}
    </li>
  );
};

export default InputWrapper;
