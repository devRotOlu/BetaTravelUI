import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthWrapper from "./AuthWrapper";
import PasswordTrigger from "./PasswordTrigger";
import FormInput from "../formElements/FormInput";
import BookingsWrapper from "../home/BookingsWrapper";
import AuthFooter from "./AuthFooter";

import { appContext } from "../../context/ContextWrapper";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [shouldSavePassword, setShouldSavePassword] = useState(true);

  const {
    setSigninDetails,
    signinDetails: { email, password },
    setIsSignedIn,
    isSignedIn,
  } = useContext(appContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) navigate("/dashboard");
  }, [isSignedIn, navigate]);

  return (
    <>
      <AuthWrapper
        header="LOG IN"
        buttonLabel="Login"
        handleFormSubmit={(e) => {
          e.preventDefault();
          setIsSignedIn(true);
        }}
      >
        <BookingsWrapper>
          <li>
            <FormInput inputType="email" inputName="email" inputValue={email} inputLabel="Email" handleChange={(e) => setSigninDetails((prevData) => ({ ...prevData, email: e.target.value }))} inputClass="authInput" />
          </li>
          <li>
            <FormInput inputType={showPassword ? "text" : "password"} inputName="password" inputValue={password} inputLabel="Password" handleChange={(e) => setSigninDetails((prevData) => ({ ...prevData, password: e.target.value }))} inputClass="authInput">
              <PasswordTrigger showPassword={showPassword} setShowPassword={setShowPassword} />
            </FormInput>
          </li>
          <li className="ps-1 d-flex justify-content-between">
            <FormInput inputClass="passwordSafeToggle" inputName="rememberPassword" inputValue="lastPassword" inputType="checkbox" handleChange={() => setShouldSavePassword((prevResult) => !prevResult)} checked={shouldSavePassword}>
              <span>Remember me</span>
            </FormInput>
            <Link to="">Forgot password?</Link>
          </li>
        </BookingsWrapper>
      </AuthWrapper>
      <AuthFooter label="Don't have an account?" linkText="Create account" link="/sign-up" />
    </>
  );
};

export default SignIn;
