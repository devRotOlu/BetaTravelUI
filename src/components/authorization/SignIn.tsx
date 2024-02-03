import { useState, useContext } from "react";

import AuthWrapper from "./AuthWrapper";
import PasswordTrigger from "./PasswordTrigger";
import FormInput from "../formElements/FormInput";
import BookingsWrapper from "../home/BookingsWrapper";

import { appContext } from "../../context/ContextWrapper";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    setSigninDetails,
    signinDetails: { email, password },
  } = useContext(appContext);

  return (
    <AuthWrapper header="LOG IN" buttonLabel="Login">
      <BookingsWrapper>
        <li>
          <FormInput inputType="email" inputName="email" inputValue={email} inputLabel="Email" handleChange={(e) => setSigninDetails((prevData) => ({ ...prevData, email: e.target.value }))} inputClass="authInput" />
        </li>
        <li>
          <FormInput inputType={showPassword ? "text" : "password"} inputName="password" inputValue={password} inputLabel="Password" handleChange={(e) => setSigninDetails((prevData) => ({ ...prevData, password: e.target.value }))} inputClass="authInput">
            <PasswordTrigger showPassword={showPassword} setShowPassword={setShowPassword} />
          </FormInput>
        </li>
      </BookingsWrapper>
    </AuthWrapper>
  );
};

export default SignIn;
