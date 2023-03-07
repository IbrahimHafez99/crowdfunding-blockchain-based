import Cookies from "js-cookie";
import { LoginAPI } from "../apis/loginAPI";
import { useStateContext } from "../context";
export const useLogin = () => {
  const { setToken, setRole } = useStateContext();
  const login = async (values) => {
    const user = await LoginAPI.login(values);
    if (user) {
      console.log(user.data.user.token);
      Cookies.set("token", user.data.user.token);
      Cookies.set("role", user.data.user.isConsultant);
      setToken(user.data.user.token);
      setRole(JSON.parse(user.data.user.isConsultant));
    }
  };
  return login;
};
