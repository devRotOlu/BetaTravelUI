import { useState, useRef } from "react";
import { Icon } from "@iconify/react";

import Button from "../Button";

import { flightSliderPropType } from "../../utils/data";

const FlightSlider = ({ children, cellHeight, columnWidth, flightNamesCount }: flightSliderPropType) => {
  const additive = 20 + columnWidth;
  const [slideDistance, setSlideDistance] = useState(() => 0);
  const clickCountRef = useRef(0);
  const handlePreviousClick = () => {
    if (clickCountRef.current !== 0) {
      setSlideDistance((prevCount) => Math.round(prevCount + additive));
      clickCountRef.current--;
    }
  };
  const handleNextClick = () => {
    if (clickCountRef.current !== flightNamesCount - 1) {
      setSlideDistance((prevCount) => Math.round(prevCount - additive));
      clickCountRef.current++;
    }
  };
  return (
    <div className="d-flex w-100 overflow-hidden position-relative border border-2 border-top-0 border-start-0 border-end-0">
      <div className="border border-2 border-top-0 border-start-0 border-bottom-0 border-secondary" style={{ width: "32%", zIndex: "100" }}>
        <span className="d-block border border-1 border-top-0 border-start-0 border-end-0" style={{ height: cellHeight, backgroundColor: "white" }}></span>
        <div className="d-flex flex-column">
          <span className="ps-3 border border-1 border-top-0 border-start-0 border-end-0 flightStops" style={{ height: "50px", lineHeight: "50px" }}>
            Nonstop
          </span>
          <span className="ps-3 border border-1 border-top-0 border-start-0 border-end-0 flightStops" style={{ height: "50px", lineHeight: "50px" }}>
            1 Stop
          </span>
          <span className="ps-3 border border-1 border-top-0 border-start-0 border-end-0 flightStops" style={{ height: "50px", lineHeight: "50px" }}>
            1+ Stops
          </span>
        </div>
      </div>
      <div style={{ width: "68%", zIndex: "10" }}>
        <div className="d-flex position-relative tableSlider" style={{ width: "fit-content", left: `${slideDistance}px` }}>
          {children}
        </div>
      </div>
      <div className="position-absolute w-100 d-flex justify-content-between" style={{ top: "50%", left: "0", transform: "translateY(-50%)", padding: "0 1px", zIndex: "100000", height: "fit-content" }}>
        <Button handleClick={handlePreviousClick} buttonType="button" buttonClass="flightTableButton text-light d-flex justify-content-center align-items-center">
          <Icon icon="ooui:previous-ltr" />
        </Button>
        <Button handleClick={handleNextClick} buttonType="button" buttonClass="flightTableButton text-light d-flex justify-content-center align-items-center">
          <Icon icon="ooui:next-ltr" />
        </Button>
      </div>
    </div>
  );
};

export default FlightSlider;
