import { useContext } from "react";

import Button from "../Button";

import { appContext } from "../../context/ContextWrapper";

const FlightFormNotification = () => {
  const appData = useContext(appContext);
  const { setNotification } = appData;
  return (
    <>
      <p style={{ fontWeight: "bold", fontSize: "18px" }}>BetaTravel.com says</p>
      <p>Fill in the details first</p>
      <Button buttonType="button" buttonLabel="OK" buttonClass="notificationBtn" handleClick={() => setNotification("")} />
    </>
  );
};

export default FlightFormNotification;
