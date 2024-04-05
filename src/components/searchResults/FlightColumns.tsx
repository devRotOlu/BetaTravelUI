import { forwardRef, ReactNode, useState, useEffect } from "react";
import { flightColumnsPropType, Queue } from "../../utils/data";
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
const FlightGrouping = forwardRef<HTMLImageElement, flightColumnsPropType>(({ flightData, cellHeight, flightLogos, flightNames }: flightColumnsPropType, ref) => {
  const width = window.screen.width;
  const widthMultiplier = 0.4284;
  const [columnWidth, setColumnWidth] = useState(() => width * widthMultiplier);
  const maxFares: [number, number, number] = [Infinity, Infinity, Infinity];
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
        if (maxFares[_index - 1] > fare) maxFares[_index - 1] = fare;
      }
      fareQueue.enqueue(fare);
    }
    index += airFlights.length - 1;
  }

  useEffect(() => {
    const resizeListener = () => {
      const width = window.screen.width;
      setColumnWidth(() => widthMultiplier * width);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const flightGroups = flightNames.map((name, index) => {
    const zeroStopFare = fareQueue.dequeue() as number;
    const oneStopFare = fareQueue.dequeue() as number;
    const manyStopFare = fareQueue.dequeue() as number;
    return (
      <div key={name} className="border border-3 border-top-0 border-start-0 border-bottom-0 border-secondary d-flex flex-column" style={{ width: `${columnWidth}px` }}>
        <div className="d-flex flex-column align-items-center justify-content-end pb-1 border border-1 border-top-0 border-start-0 border-end-0" style={{ height: cellHeight }}>
          <div style={{ width: "50px", height: "fit-content" }}>{index === 0 ? <img className="w-100" ref={ref} src={flightLogos[index]} alt={name} /> : <img className="w-100" src={flightLogos[index]} alt={name} />}</div>
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
        {getSpanElement(maxFares[0] === Infinity, maxFares[0])}
        {getSpanElement(maxFares[1] === Infinity, maxFares[1])}
        {getSpanElement(maxFares[2] === Infinity, maxFares[2])}
      </div>
      {flightGroups}
    </>
  );
});

export default FlightGrouping;
