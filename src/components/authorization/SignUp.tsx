import { useState, useContext } from "react";

import FormInput from "../formElements/FormInput";
import BookingsWrapper from "../home/BookingsWrapper";
import PasswordTrigger from "./PasswordTrigger";
import AuthWrapper from "./AuthWrapper";

import { appContext } from "../../context/ContextWrapper";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    setSignupDetails,
    signupDetails: { firstName, lastName, email, password },
  } = useContext(appContext);
  return (
    <AuthWrapper buttonLabel="Create Account" header="CREATE ACCOUNT">
      <BookingsWrapper>
        <li>
          <FormInput inputType="text" inputName="firstName" inputValue={firstName} inputLabel="First Name" handleChange={(e) => setSignupDetails((prevData) => ({ ...prevData, firstName: e.target.value }))} inputClass="authInput" />
        </li>
        <li>
          <FormInput inputType="text" inputName="lastName" inputValue={lastName} inputLabel="Last Name" handleChange={(e) => setSignupDetails((prevData) => ({ ...prevData, lastName: e.target.value }))} inputClass="authInput" />
        </li>
        <li>
          <FormInput inputType="email" inputName="email" inputValue={email} inputLabel="Email" handleChange={(e) => setSignupDetails((prevData) => ({ ...prevData, email: e.target.value }))} inputClass="authInput" />
        </li>
        <li>
          <FormInput inputType={showPassword ? "text" : "password"} inputName="password" inputValue={password} inputLabel="Password" handleChange={(e) => setSignupDetails((prevData) => ({ ...prevData, password: e.target.value }))} inputClass="authInput">
            <PasswordTrigger showPassword={showPassword} setShowPassword={setShowPassword} />
          </FormInput>
        </li>
      </BookingsWrapper>
    </AuthWrapper>
  );
};

export default SignUp;
