import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (count > 0) {
      const countDown = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(countDown);
    } else {
      navigate("/");
    }
  }, [count, navigate]);

  return (
    <div>
      <h1>
        Bạn đã xác minh tài khoản thành công, bạn sẽ được chuyển hướng sau....
      </h1>
      <h3>{count}</h3>
    </div>
  );
};

export default Success;
