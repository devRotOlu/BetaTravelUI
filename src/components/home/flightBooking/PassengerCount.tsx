import { useContext } from "react";

import AdultPax from "../AdultPax";
import Pax from "../Pax";
import ChildPax from "../ChildPax";
import BookingButtons from "../BookingButtons";
import PaxButtons from "../PaxButtons";
import Wrapper from "../Wrapper";

import { flightContext } from "../../../context/FlightContext";

const PassengerCount = () => {
  const flightData = useContext(flightContext);
  const { passengerCount, setPassengerCount } = flightData;

  const { adults, children, infants } = passengerCount[0];

  return (
    <Wrapper>
      <Pax>
        <AdultPax>
          <PaxButtons count={adults} minCount={1} setCount={setPassengerCount} guestType="adults" roomIndex={0} />
        </AdultPax>
        <ChildPax label="Children" ageRange="2 - 11yrs">
          <PaxButtons count={children} minCount={0} setCount={setPassengerCount} guestType="children" roomIndex={0} />
        </ChildPax>
        <ChildPax label="Infants" ageRange="Under 2 yrs">
          <PaxButtons count={infants} minCount={0} setCount={setPassengerCount} guestType="infants" roomIndex={0} />
        </ChildPax>
      </Pax>
      <BookingButtons />
    </Wrapper>
  );
};

export default PassengerCount;
