import NavbarExpand from "../NavbarExpand";
import NavbarCancel from "../NavbarCancel";
import OffCanvasNavbar from "../OffCanvasNavbar";
import User from "./User";
import NavBrand from "../NavBrand";
import DashboardNavigation from "./DashboardNavigation";

const Dashboard = () => {
  return (
    <div>
      <OffCanvasNavbar linkWidth={75} direction="start">
        <>
          <NavbarExpand />
          <User />
        </>
        <>
          <NavBrand />
          <NavbarCancel />
        </>
        <DashboardNavigation />
      </OffCanvasNavbar>
    </div>
  );
};

export default Dashboard;
