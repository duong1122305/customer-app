import { Outlet } from "react-router-dom";
import "./BlankLayout.css";

const BlankLayout = () => {
  return (
    <div className="blankLayout">
      <Outlet />
    </div>
  );
};

export default BlankLayout;
