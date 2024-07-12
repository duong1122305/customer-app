import PropTypes from 'prop-types';
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import "./Sidebar.css";
import UserInfo from "../UserInfo/UserInfo";
import Pet from "../Pet/Pet";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onItemClick }) => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("dashboard");
  const signOut = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  const [name, setName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const result = JSON.parse(token);
    if(token){
      setName(result.name);
      console.log("ok");
    }
  }, [name]);

  return (
    <Nav
      className="flex-column sidebar"
      activeKey={activeKey}
      onSelect={(selectedKey) => setActiveKey(selectedKey)}
    >
      <div className="sidebar-header">
        <img src="https://dersteira.at/img/nh-nn-trng-fb.jpg" alt="Profile" className="rounded-circle" />
        <span className="username">{name}</span>
      </div>

      <Nav.Link onClick={() => onItemClick(<UserInfo />)}>
        <FontAwesomeIcon icon={faHouse} /> Dashboard
      </Nav.Link>
      <Nav.Link onClick={() => onItemClick(<Pet />)}>
        <FontAwesomeIcon icon={faHouse} /> My Pet
      </Nav.Link>

      <Button variant="link" className="sign-out" onClick={signOut}>
        <FontAwesomeIcon icon={faRightFromBracket} /> Đăng xuất
      </Button>
    </Nav>
  );
};

Sidebar.propTypes = {
    onItemClick: PropTypes.func
}

export default Sidebar;
