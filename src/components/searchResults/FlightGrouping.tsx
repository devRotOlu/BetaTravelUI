import { useState, forwardRef, ReactNode } from "react";
import { flightGroupingPropType, Queue } from "../../utils/data";
const getSpanElement = (isTrue: boolean, value: number): ReactNode => {
  if (isTrue) {
    return (
      <span className="ps-3 border border-1 border-top-0 border-start-0 border-end-0" style={{ height: "50px", lineHeight: "50px" }}>
        -
      </span>
    );
  }
  return (
    <span className="ps-3 border border-1 border-top-0 border-start-0 border-end-0" style={{ height: "50px", lineHeight: "50px" }}>
      &#8358;{value}
    </span>
  );
};
const FlightGrouping = forwardRef<HTMLImageElement, flightGroupingPropType>(({ flightData, cellHeight, columnWidth, flightLogos, flightNames }: flightGroupingPropType, ref) => {
  const maxfares: [number, number, number] = [Infinity, Infinity, Infinity];
  const fareQueue = new Queue();
  for (let index = 0; index < flightData.length; index++) {
    const { segments } = flightData[index];
    const { name } = segments[0].legs[0].carriersData[0];
    const airFlights = flightData.filter((flight) => {
      const { segments } = flight;
      const { name: _name } = segments[0].legs[0].carriersData[0];
      return name === _name;
    });
    for (let _index = 1; _index <= 3; _index++) {
      const flight = airFlights.find((flight) => {
        const { segments } = flight;
        if (_index < 3) return segments[0].legs.length === _index;
        return segments[0].legs.length >= _index;
      });
      let fare = 0;
      if (flight) {
        const {
          priceBreakdown: {
            total: { units },
          },
        } = flight;
        fare = units;
        if (maxfares[_index - 1] > fare) maxfares[_index - 1] = fare;
      }
      fareQueue.enqueue(fare);
    }
    index += airFlights.length - 1;
  }

  const flightGroups = flightNames.map((name, index) => {
    const zeroStopFare = fareQueue.dequeue() as number;
    const oneStopFare = fareQueue.dequeue() as number;
    const manyStopFare = fareQueue.dequeue() as number;
    return (
      <div key={name} className="border border-3 border-top-0 border-start-0 border-bottom-0 border-secondary d-flex flex-column" style={{ width: `${columnWidth}px` }}>
        <div className="d-flex flex-column align-items-center justify-content-end pb-1 border border-1 border-top-0 border-start-0 border-end-0" style={{ height: cellHeight }}>
          <div style={{ width: "50px", height: "fit-content" }}>{!index ? <img className="w-100" src={flightLogos[index]} alt={name} /> : <img ref={ref} className="w-100" src={flightLogos[index]} alt={name} />}</div>
          <span>{name}</span>
        </div>
        {getSpanElement(zeroStopFare === 0, zeroStopFare)}
        {getSpanElement(oneStopFare === 0, oneStopFare)}
        {getSpanElement(manyStopFare === 0, manyStopFare)}
      </div>
    );
  });

  return (
    <>
      <div className="border border-3 border-top-0 border-start-0 border-bottom-0 border-secondary d-flex flex-column" style={{ width: `${columnWidth}px` }}>
        <div style={{ height: cellHeight }} className="d-flex align-items-end pb-1 border border-1 border-top-0 border-start-0 border-end-0">
          <p className="text-center w-100">All Airlines</p>
        </div>
        {getSpanElement(maxfares[0] === Infinity, maxfares[0])}
        {getSpanElement(maxfares[1] === Infinity, maxfares[1])}
        {getSpanElement(maxfares[2] === Infinity, maxfares[2])}
      </div>
      {flightGroups}
    </>
  );
});

export default FlightGrouping;
