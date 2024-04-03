import { flightSearchDetailsProps } from "../../utils/data";

const FlightSearchDetails = ({ departDate, departLocation, depart_code, destLocation, dest_code, adults, children, infants, returnDate, flightClass }: flightSearchDetailsProps) => {
  return (
    <div className="searchDetails text-light">
      <h3 className="fw-bold">
        {departLocation} ({depart_code}) - {destLocation} ({dest_code})
      </h3>
      <p className="mt-2">
        {departDate}
        {returnDate && `- ${returnDate}`}
        <span className="ms-2">
          {adults} Adults {children ? `, ${children} Chldren` : ""} {infants ? `, ${infants} Infants` : ""}, {flightClass}
        </span>
      </p>
    </div>
  );
};

export default FlightSearchDetails;
