import { Link } from "react-router-dom";

import { flightCardPropType } from "../../utils/data";
import useImageHeight from "../../utils/useCustomHooks/useImageHeight";

const splitTime = (time: string) => {
  const timeParts = time.split("T")[1].split(":");
  return `${timeParts[0]}:${timeParts[1]}`;
};

const getTimeInHours = (totalTime: number): string => {
  const secondToHour = 3600;
  const hours = Math.floor(totalTime / secondToHour);
  const minutes = (totalTime % secondToHour) / 60;
  return `${hours}h : ${minutes}m`;
};

const FlightCard = ({
  flightData: {
    segments,
    priceBreakdown: {
      total: { units },
    },
    token,
  },
}: flightCardPropType) => {
  const { imageRef, imageHeight } = useImageHeight();
  const {
    legs,
    arrivalAirport: { cityName: arrivalCityName, code: arrivalCityCode },
    departureAirport: { cityName: departureCityName, code: departureCityCode },
    arrivalTime,
    departureTime,
    totalTime,
  } = segments[0];
  const { cabinClass } = legs[0];
  const { name, logo } = legs[0].carriersData[0];
  const { flightNumber } = legs[0].flightInfo;
  const stopCount = legs.length - 1;
  return (
    <li className="d-flex flightCard w-100 gap-3 ps-2">
      <div className="d-flex flex-column gap-2 py-1">
        <div className="d-flex gap-3 align-items-center">
          <div style={{ width: "25px", height: "fit-content" }}>
            <img ref={imageRef} style={{ width: "100%" }} src={logo} alt={`${name}_${flightNumber}`} />
          </div>
          <p className="fw-bold" style={{ color: "darkblue" }}>
            {name}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column gap-2">
            <p className="locationTimeCode">
              <span className="fw-bold">{splitTime(departureTime)}</span>
              <span> ({departureCityCode})</span>
            </p>
            <p className="locationCity text-secondary">{departureCityName}</p>
          </div>
          <div className="d-flex flex-column gap-2">
            <p className="fw-bold">{getTimeInHours(totalTime)}</p>
            <div className="d-flex align-items-center" style={{ height: "fit-content" }}>
              <span style={{ width: "3px", height: "3px", backgroundColor: "var(--lightBlue)" }} />
              <span style={{ height: "1px", width: "60px", backgroundColor: "var(--lightBlue)" }} />
              <span style={{ width: "3px", height: "3px", backgroundColor: "var(--lightBlue)", borderRadius: "50%" }} />
            </div>
            <p className="flightStopCount fw-bold">{stopCount > 1 ? `${stopCount} Stops` : `${stopCount} Stop`} </p>
          </div>
          <div className="d-flex flex-column gap-2">
            <p>
              <span className="fw-bold">{splitTime(arrivalTime)}</span>
              <span> ({arrivalCityCode})</span>
            </p>
            <p className="text-secondary">{arrivalCityName}</p>
          </div>
        </div>
        <span className="text-secondary">{cabinClass}</span>
      </div>
      <div className="d-flex flex-column gap-2 px-2  align-items-center" style={{ paddingTop: `${imageHeight}px` }}>
        <p className="fw-bold mt-2">&#8358;{units}</p>
        <Link className="fw-bold py-2" to={`/search/${token}`}>
          View
        </Link>
      </div>
    </li>
  );
};

export default FlightCard;
