import React from "react";
import { Icon } from "@iconify/react";

import Button from "../Button";

import { PasswordTriggerProps } from "../../utils/data";

const PasswordTrigger = ({ showPassword, setShowPassword }: PasswordTriggerProps) => {
  return (
    <Button buttonClass="passwordTrigger" buttonType="button">
      {!showPassword && (
        <span onClick={() => setShowPassword(true)}>
          <Icon icon="ph:eye" />
        </span>
      )}
      {showPassword && (
        <span onClick={() => setShowPassword(false)}>
          <Icon icon="mynaui:eye-slash" />
        </span>
      )}
    </Button>
  );
};

export default PasswordTrigger;
