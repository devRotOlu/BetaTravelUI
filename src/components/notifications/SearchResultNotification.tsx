import { useContext } from "react";
import { Icon } from "@iconify/react";

import { SearchResultNotificationProps } from "../../utils/data";
import { appContext } from "../../context/ContextWrapper";

const SearchResultNotification = ({ departure, destination, returnDate, departureDate, flightClass, passengerCount }: SearchResultNotificationProps) => {
  const appData = useContext(appContext);
  const { currentYear } = appData;
  const flight = (
    <span className="d-flex justify-content-center">
      <Icon style={{ fontSize: "20px" }} icon="material-symbols:flightsmode" />
    </span>
  );
  return (
    <div className="d-flex flex-column align-items-center p-4 gap-4">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="d-flex flex-column gap-2">
        <p className="fw-bold">{departure}</p>
        {flight}
        <p className="fw-bold">{destination}</p>
      </div>
      <div className="d-flex flex-column gap-3 align-items-center">
        <p className="text-center fw-light">Please wait, while we find the best fare for you </p>
        <div className="fw-bold">
          <p>
            {departureDate} {currentYear}
          </p>
          {returnDate && flight}
          <p>{returnDate ? `${returnDate}, ${currentYear}` : ""}</p>
        </div>
        <p className="fw-bold">
          {passengerCount} Passenger, {flightClass}
        </p>
      </div>
    </div>
  );
};

export default SearchResultNotification;
