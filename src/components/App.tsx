import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Home from "./home/Home";
import OffCanvasNavbar from "./OffCanvasNavbar";
import CarBooking from "./home/CarBooking";
import FlightBooking from "./home/flightBooking/FlightBooking";
import HotelBookingWrapper from "./home/hotelBooking/HotelBookingWrapper";
import ManageBookings from "./home/ManageBookings";
import OneWayBooking from "./home/flightBooking/OneWayBooking";
import MultiCityBooking from "./home/flightBooking/MultiCityBooking";
import RoundTripBooking from "./home/flightBooking/RoundTripBooking";
import ContextWrapper from "../context/ContextWrapper";

import "../assests/styles/App.css";

function App() {
  return (
    <ContextWrapper>
      <OffCanvasNavbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="flight" element={<FlightBooking />}>
            <Route path="round-trip" element={<RoundTripBooking />} />
            <Route path="multi-city" element={<MultiCityBooking />} />
            <Route path="one-way" element={<OneWayBooking />} />
          </Route>
          <Route path="cars" element={<CarBooking />} />
          <Route path="hotels" element={<HotelBookingWrapper />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </ContextWrapper>
  );
}

export default App;
