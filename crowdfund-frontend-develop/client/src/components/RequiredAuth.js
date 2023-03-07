import React, { useEffect } from "react";
import { useStateContext } from "../context";
import Cookies from "js-cookie";
const RequiredAuth = ({ children }) => {
  const { setToken, setRole } = useStateContext();
  const token = Cookies.get("token");
  useEffect(() => {
    setToken(token);
    setRole(Cookies.get("role") ? JSON.parse(Cookies.get("role")) : false);
  }, []);
  return <>{children}</>;
};

export default RequiredAuth;
