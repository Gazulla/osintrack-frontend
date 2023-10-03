import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../actions/authActions";

export default function useLogin() {
  const { user, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleLogin = ({ username, password }) => {
    dispatch(login(username, password));
  };
  const handleLogout = () => dispatch(logout());

  return { user, error, handleLogin, handleLogout };
}
