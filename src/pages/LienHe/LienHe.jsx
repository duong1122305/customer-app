import "./LienHe.css";

const LienHe = () => {
  return (
    <div className="lienhe">
      <div className="login-box">
        <h4>Liên Hệ</h4>
        <form>
          <div className="user-box">
            <input type="text" name="" required="" />
            <label>Tiêu đề</label>
          </div>
          <div className="user-box">
            <input type="text" name="" required="" />
            <label>Họ và tên</label>
          </div>
          <div className="user-box">
            <input type="text" name="" required="" />
            <label>Địa chỉ</label>
          </div>
          <div className="user-box">
            <input type="email" name="" required="" />
            <label>Email</label>
          </div>
          <div className="user-box">
            <textarea type="text" name="" required="" rows={3}/>
            <label>Nội dung</label>
          </div>
          <center>
            <button type="reset">
              Nhập lại
              <span></span>
            </button>
            <button type="submit">
              Gửi
              <span></span>
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default LienHe;
