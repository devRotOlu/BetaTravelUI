import { useContext } from "react";

import AdultPax from "../AdultPax";
import Pax from "../Pax";
import ChildPax from "../ChildPax";
import BookingButtons from "../BookingButtons";
import PaxButtons from "../PaxButtons";
import Wrapper from "../Wrapper";

import { flightContext } from "./FlightContext";

const PassengerCount = () => {
  const flightData = useContext(flightContext);
  const {
    passengerCount: { adults, children, infants },
    setPassengerCount,
  } = flightData;

  return (
    <Wrapper>
      <Pax>
        <AdultPax>
          <PaxButtons count={adults} minCount={1} setCount={setPassengerCount} guestType="adults" />
        </AdultPax>
        <ChildPax label="Children" ageRange="2 - 11yrs">
          <PaxButtons count={children} minCount={0} setCount={setPassengerCount} guestType="children" />
        </ChildPax>
        <ChildPax label="Infants" ageRange="Under 2 yrs">
          <PaxButtons count={infants} minCount={0} setCount={setPassengerCount} guestType="infants" />
        </ChildPax>
      </Pax>
      <BookingButtons />
    </Wrapper>
  );
};

export default PassengerCount;
