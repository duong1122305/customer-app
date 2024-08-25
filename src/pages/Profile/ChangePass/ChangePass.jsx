import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

const ChangePass = () => {
    const [newPass, setNewPass] = useState("");
    const [rePass, setRePass] = useState("");
    const [alert, setAlert] = useState("");

    const handleChangePass = async (e) => {
        e.preventDefault();
        if(rePass !== newPass){
            setAlert("Hai mật khẩu không giống nhau");
            return;
        }
    }

    return (
        <>
        <Form onSubmit={handleChangePass}>
            <FloatingLabel label="Mật khẩu cũ">
                <Form.Control />
            </FloatingLabel>
            <FloatingLabel label="Mật khẩu mới">
                <Form.Control value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
            </FloatingLabel>
            {alert && <div style={{color:"red"}}>{alert}</div>}
            <FloatingLabel label="Nhập lại mật khẩu">
                <Form.Control value={rePass} onChange={(e) => setRePass(e.target.value)}/>
            </FloatingLabel>
            {alert && <div style={{color:"red"}}>{alert}</div>}
            <Button type='submit'>Xác nhận</Button>
        </Form>   
        </>
    );
};

export default ChangePass;