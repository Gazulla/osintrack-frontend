import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../actions/authActions";

export default function useLogin() {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleLogin = () => dispatch(login("admin", "gazu"));
  const handleLogout = () => dispatch(logout());

  return { user, handleLogin, handleLogout };
}
