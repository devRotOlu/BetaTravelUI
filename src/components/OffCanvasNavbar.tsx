import { OffCanvasNavbarProps } from "../utils/data";

const OffCanvasNavbar = ({ children, linkWidth, direction }: OffCanvasNavbarProps) => {
  return (
    <nav className="navbar bg-body-light" style={{ position: "relative" }}>
      <div className="container-fluid">
        {children[0]}
        <div className={`offcanvas w-${linkWidth} offcanvas-${direction}`} tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">{children[1]}</div>
          <div className="offcanvas-body">{children[2]}</div>
        </div>
      </div>
    </nav>
  );
};

export default OffCanvasNavbar;
