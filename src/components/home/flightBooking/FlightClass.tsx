import { useContext } from "react";
import { Icon } from "@iconify/react";

import FormInput from "../../formElements/FormInput";
import DataList from "../../formElements/DataList";

import { flightContext } from "./FlightContext";

type FlightClassProps = {
  inputClass?: string;
  index: number;
};

const FlightClass = ({ inputClass, index }: FlightClassProps) => {
  const flightData = useContext(flightContext);
  const { flightDetails, setFlightDetails } = flightData;
  return (
    <FormInput inputName="flightClass" inputType="text" inputValue={flightDetails[index].flightClass} inputClass={inputClass} handleChange={() => {}}>
      <>
        <span style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "10px" }}>
          <Icon icon="bxs:down-arrow" />
        </span>
      </>
    </FormInput>
  );
};

export default FlightClass;
