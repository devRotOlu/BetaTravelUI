import React from "react";
import { Icon } from "@iconify/react";

const ArrowSwap = () => {
  return (
    <span style={{ width: "33px", height: "28px", position: "absolute", top: "100%", left: "50%", transform: "translate(-50%,-4px)", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "blue", color: "white", borderRadius: "5px", zIndex: "100" }}>
      <Icon icon="fluent:arrow-swap-16-filled" />
    </span>
  );
};

export default ArrowSwap;
