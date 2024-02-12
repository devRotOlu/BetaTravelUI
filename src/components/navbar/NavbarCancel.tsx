import React from "react";

type NavbarCancelProps = {};
const NavbarCancel = React.forwardRef<HTMLButtonElement, NavbarCancelProps>(({}: NavbarCancelProps, ref) => {
  return <button ref={ref} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>;
});

export default NavbarCancel;
