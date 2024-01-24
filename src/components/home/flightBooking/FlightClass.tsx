import { useContext } from "react";
import { Icon } from "@iconify/react";

import InputDropDown from "../../formElements/InputDropDown";

import { flightContext } from "../../../context/FlightContext";

type FlightClassProps = {
  inputClass?: string;
  children: React.ReactNode;
  focusedInput: string;
  flightClass: string;
};

const FlightClass = ({ inputClass, children, focusedInput, flightClass }: FlightClassProps) => {
  const flightData = useContext(flightContext);
  const { isFocused, setIsFocused } = flightData;
  const handleFocused = () => setIsFocused(focusedInput);
  return (
    <>
      <InputDropDown name="flightClass" inputId="flightClass" inputClass={inputClass} value={flightClass} handleChange={(e) => {}} handleFocus={() => handleFocused()} isFocused={isFocused === focusedInput}>
        {children}
      </InputDropDown>
      <span style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "10px" }}>
        <Icon icon="bxs:down-arrow" />
      </span>
    </>
  );
};

export default FlightClass;
