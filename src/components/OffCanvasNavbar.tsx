import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import travelbeta from "../assests/travelbeta.png";

const OffCanvasNavbar = () => {
  const icon = "ion:chevron-forward-outline";
  return (
    <nav className="navbar bg-body-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img style={{ width: "100px" }} src={travelbeta} alt="travelBeta" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <Link className="navbar-brand" to="/">
              <img style={{ width: "100px" }} src={travelbeta} alt="travelBeta" />
            </Link>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1  row-gap-3">
              <li className="nav-item">
                <Link to="/">
                  Visa
                  <Icon icon={icon} />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/">
                  Vacation Packages
                  <Icon icon={icon} />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/">
                  Become an affiliate
                  <Icon icon={icon} />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="sign-in">
                  Login
                  <Icon icon={icon} />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sign-up">
                  Create account
                  <Icon icon={icon} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OffCanvasNavbar;
