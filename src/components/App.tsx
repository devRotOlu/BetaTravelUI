import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Home from "./home/Home";
import OffCanvasNavbar from "./OffCanvasNavbar";
import CarBooking from "./home/CarBooking";
import FlightBooking from "./home/flightBooking/FlightBooking";
import HotelBooking from "./home/HotelBooking";
import ManageBookings from "./home/ManageBookings";
import OneWayBooking from "./home/flightBooking/OneWayBooking";
import MultiCityBooking from "./home/flightBooking/MultiCityBooking";
import RoundTripBooking from "./home/flightBooking/RoundTripBooking";

import "../assests/styles/App.css";

function App() {
  return (
    <div>
      <OffCanvasNavbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route element={<FlightBooking />}>
            <Route path="flight-round-trip" element={<RoundTripBooking />} />
            <Route path="flight-multi-city" element={<MultiCityBooking />} />
            <Route path="flight-one-way" element={<OneWayBooking />} />
          </Route>
          <Route path="cars" element={<CarBooking />} />
          <Route path="hotels" element={<HotelBooking />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
