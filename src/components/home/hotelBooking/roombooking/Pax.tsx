import { PaxProps } from "../../../../utils/data";

const Pax = ({ children }: PaxProps) => {
  return <span className="d-flex flex-column gap-3">{children}</span>;
};

export default Pax;
