import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Home from "./home/Home";
import CarBooking from "./home/CarBooking";
import FlightBooking from "./home/flightBooking/FlightBooking";
import HotelBookingWrapper from "./home/hotelBooking/HotelBookingWrapper";
import ManageBookings from "./home/ManageBookings";
import OneWayBooking from "./home/flightBooking/OneWayBooking";
import MultiCityBooking from "./home/flightBooking/MultiCityBooking";
import RoundTripBooking from "./home/flightBooking/RoundTripBooking";
import ContextWrapper from "../context/ContextWrapper";
import SignUp from "./authorization/SignUp";
import SignIn from "./authorization/SignIn";
import Dashboard from "./authorizedUserResources/Dashboard";
import Account from "./authorizedUserResources/Account";
import Chat from "./authorizedUserResources/Chat";
import AuthorizedUserResources from "./authorizedUserResources/AuthorizedUserResources";
import ResourcePages from "./ResourcePages";

import "react-calendar/dist/Calendar.css";
import "../assests/styles/App.css";

function App() {
  return (
    <ContextWrapper>
      <Routes>
        <Route element={<ResourcePages />}>
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
          <Route element={<AuthorizedUserResources />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Routes>
    </ContextWrapper>
  );
}

export default App;
