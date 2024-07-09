import { useState } from "react";
import "./Profile.css";
import Sidebar from "./Sidebar/Sidebar";
import UserInfo from "./UserInfo/UserInfo";

const Profile = () => {
  const [activeComponent, setActiveComponent] = useState(<UserInfo />);

  const handleItemClick = (component) => {
    setActiveComponent(component);
  };
  return (
    <div className="container">
      <div className="container-2">
        <Sidebar onItemClick={handleItemClick} className="sidebar" />
        <div className="content">{activeComponent}</div>
      </div>
    </div>
  );
};

export default Profile;
