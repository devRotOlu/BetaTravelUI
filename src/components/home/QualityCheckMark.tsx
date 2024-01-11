import React from "react";
import { Icon } from "@iconify/react";

const QualityCheckMark = () => {
  return (
    <p className="mt-4 d-flex justify-content-center text-light gap-2">
      <span style={{ color: "black" }}>
        <Icon style={{ color: "inherit" }} icon="emojione:white-heavy-check-mark" />
      </span>
      we offer the best deals in the industry
    </p>
  );
};

export default QualityCheckMark;
