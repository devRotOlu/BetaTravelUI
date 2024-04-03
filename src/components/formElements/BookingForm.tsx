import React from "react";

type BookingFormProp = {
  children: React.ReactNode;
  handleSubmit: () => void;
};

const BookingForm = ({ children, handleSubmit }: BookingFormProp) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className="bookingsForm container-fluid d-flex flex-column justify-content-center py-4"
    >
      {children}
    </form>
  );
};

export default BookingForm;
