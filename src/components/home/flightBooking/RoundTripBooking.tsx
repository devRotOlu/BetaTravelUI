import InputWrapper from "../../formElements/formDataList/InputWrapper";
import DataList from "../../formElements/DataList";
import BasicFlightFormElements from "./BasicFlightFormElements";

const RoundTripBooking = () => {
  return (
    <ul className="p-0 w-100 d-flex flex-column gap-3">
      <BasicFlightFormElements />
    </ul>
  );
};

export default RoundTripBooking;
