import React from "react";

type BookingsWrapperProps = {
  children: React.ReactNode;
};
const BookingsWrapper = ({ children }: BookingsWrapperProps) => {
  return (
    <ul className="p-0 w-100 d-flex flex-column" style={{ gap: "20px" }}>
      {children}
    </ul>
  );
};

export default BookingsWrapper;
