import PropTypes from 'prop-types';
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import "./Sidebar.css";
import UserInfo from "../UserInfo/UserInfo";
import Pet from "../Pet/Pet";

const Sidebar = ({ onItemClick }) => {
  const [activeKey, setActiveKey] = useState("dashboard");
  return (
    <Nav
      className="flex-column sidebar"
      activeKey={activeKey}
      onSelect={(selectedKey) => setActiveKey(selectedKey)}
    >
      <div className="sidebar-header">
        <img src="profile.jpg" alt="Profile" className="rounded-circle" />
        <span className="username">Sarah Smith</span>
      </div>

      <Nav.Link onClick={() => onItemClick(<UserInfo />)}>
        <FontAwesomeIcon icon={faHouse} /> Dashboard
      </Nav.Link>
      <Nav.Link onClick={() => onItemClick(<Pet />)}>
        <FontAwesomeIcon icon={faHouse} /> My Pet
      </Nav.Link>

      <Button variant="link" className="sign-out">
        <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
      </Button>
    </Nav>
  );
};

Sidebar.propTypes = {
    onItemClick: PropTypes.func
}

export default Sidebar;
