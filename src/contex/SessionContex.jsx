import { useState, createContext } from "react";
import callApi from "../utlis/request";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const SessionContext = createContext();

function SessionProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = async (postData) => {
    const response = await callApi("GuestAuthen/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await response.json();
    const decode = jwtDecode(result.data);
    const tokenValue = {
      name: decode[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"
      ],
      email:
        decode[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
      username:
        decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      id: decode[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
    };
    const objValue = JSON.stringify(tokenValue);
    if (result.isSuccess === true) {
      setIsLogin(true);
      sessionStorage.setItem("token", objValue);
      return true;
    }
    return false;
  };

  const returnValue = {
    isLogin,
    handleLogin,
  };

  return (
    <SessionContext.Provider value={returnValue}>
      {children}
    </SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  children: PropTypes.any,
};

export { SessionContext, SessionProvider };
