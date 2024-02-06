import { Link } from "react-router-dom";

import travelbeta from "../assests/travelbeta.png";

const NavBrand = () => {
  return (
    <Link className="navbar-brand" to="/">
      <img style={{ width: "100px" }} src={travelbeta} alt="travelBeta" />
    </Link>
  );
};

export default NavBrand;
