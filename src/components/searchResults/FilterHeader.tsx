import { Icon } from "@iconify/react";

import { filterHeaderTypeProps } from "../../utils/data";

const FilterHeader = ({ handleClick, filterType }: filterHeaderTypeProps) => {
  return (
    <div className="d-flex justify-content-between">
      <span className="fw-bold">{filterType}</span>
      <button onClick={handleClick} className="filterReset" type="button">
        Clear
        <Icon icon="ep:arrow-up-bold" />
      </button>
    </div>
  );
};

export default FilterHeader;
