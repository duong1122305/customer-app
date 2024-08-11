import PropTypes from 'prop-types';
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import "./Sidebar.css";
import UserInfo from "../UserInfo/UserInfo";
import Pet from "../Pet/Pet";
import { useNavigate } from 'react-router-dom';
import BookingInfo from '../BookingInfo/BookingInfo';

const Sidebar = ({ onItemClick }) => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("dashboard");
  const [name, setName] = useState("");
  
  const signOut = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  const toFirst = () => {
    navigate("/");
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const result = JSON.parse(token);
    if(token){
      setName(result.name);
    }
  }, [name]);

  return (
    <Nav
      className="flex-column sidebar"
      activeKey={activeKey}
      onSelect={(selectedKey) => setActiveKey(selectedKey)}
    >
      <div className="sidebar-header">
        <span className="username">{name}</span>
      </div>

      <Nav.Link onClick={() => onItemClick(<UserInfo />)}>
        <FontAwesomeIcon icon={faHouse} /> Dashboard
      </Nav.Link>
      <Nav.Link onClick={() => onItemClick(<Pet />)}>
        <FontAwesomeIcon icon={faHouse} /> My Pet
      </Nav.Link>
      <Nav.Link onClick={() => onItemClick(<BookingInfo />)}>
        <FontAwesomeIcon icon={faHouse} /> Lịch của bạn
      </Nav.Link>

      <Button variant="link" className="sign-out" onClick={toFirst}>
        <FontAwesomeIcon icon={faRightFromBracket} /> Quay lại trang chủ
      </Button>
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
