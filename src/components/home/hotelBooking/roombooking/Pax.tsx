import { PaxProps } from "../../../../utils/data";

const Pax = ({ children }: PaxProps) => {
  return (
    <span className="d-flex flex-column gap-3">
      <span className="d-flex justify-content-between">
        <span>Adult</span>
        {children[0]}
      </span>
      <span className="d-flex justify-content-between">
        <span className="d-flex flex-column">
          <span>Children</span>
          <span>2 - 11yrs</span>
        </span>
        {children[1]}
      </span>
    </span>
  );
};

export default Pax;
