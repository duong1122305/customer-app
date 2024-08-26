import { useRef, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import callApi from "../../../utlis/request";
import Announcement from "../../../components/AnnouncementComponent/Announcement";
import "./ChangePass.css";

const ChangePass = () => {
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [alert, setAlert] = useState("");
  const oldPassRef = useRef(null);

  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");

  const token = sessionStorage.getItem("token");
  const result = JSON.parse(token);
  const id = result.id;

  const handleChangePass = async (e) => {
    e.preventDefault();
    if (rePass !== newPass) {
      setAlert("Mật khẩu không trùng khớp");
      return;
    }
    try {
      const res = await callApi(
        `GuestManager/change-pass?userName=${id}&oldPass=${oldPassRef.current.value}&newPass=${newPass}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      if (result.isSuccess) {
        setShow(true);
        setContent("Đổi mật khẩu thành công");
      } else {
        setShow(true);
        setContent("Đổi mật khẩu thất bại");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="change_pass">
      <Form onSubmit={handleChangePass}>
        <FloatingLabel label="Mật khẩu cũ">
          <Form.Control ref={oldPassRef} />
        </FloatingLabel>
        <FloatingLabel label="Mật khẩu mới">
          <Form.Control
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </FloatingLabel>
        {alert && <div style={{ color: "red" }}>{alert}</div>}
        <FloatingLabel label="Nhập lại mật khẩu">
          <Form.Control
            value={rePass}
            onChange={(e) => setRePass(e.target.value)}
          />
        </FloatingLabel>
        {alert && <div style={{ color: "red" }}>{alert}</div>}
        <Button type="submit">Xác nhận</Button>
      </Form>
      <Announcement
        show={show}
        onClose={() => setShow(false)}
        content={content}
      />
    </div>
  );
};

export default ChangePass;
