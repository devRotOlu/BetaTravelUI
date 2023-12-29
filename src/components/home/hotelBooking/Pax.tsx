import { useContext, useState, useEffect, useRef } from "react";

import PaxButtons from "./PaxButtons";

import { hotelContext } from "./HotelContext";

const Pax = () => {
  const adultMinCount = 1;
  const childMinCount = 0;
  const [adultCount, setAdultCount] = useState(adultMinCount);
  const [childCount, setChildCount] = useState(childMinCount);
  const hotelData = useContext(hotelContext);
  const { setTotalGuest } = hotelData;
  const _prevTotal = useRef(adultCount + childCount);

  useEffect(() => {
    if (_prevTotal.current !== adultCount + childCount) {
      if (_prevTotal.current < adultCount + childCount) {
        setTotalGuest((prevCount) => ++prevCount);
      } else {
        setTotalGuest((prevCount) => --prevCount);
      }
      _prevTotal.current = adultCount + childCount;
    } else {
      setTotalGuest((prevCount) => prevCount + adultCount);
    }
  }, [adultCount, childCount, setTotalGuest]);

  return (
    <span className="d-flex flex-column gap-3">
      <span className="d-flex justify-content-between">
        <span>Adult</span>
        <PaxButtons minCount={adultMinCount} count={adultCount} setCount={setAdultCount} />
      </span>
      <span className="d-flex justify-content-between">
        <span className="d-flex flex-column">
          <span>Children</span>
          <span>2 - 11yrs</span>
        </span>
        <PaxButtons minCount={childMinCount} count={childCount} setCount={setChildCount} />
      </span>
    </span>
  );
};

export default Pax;
