import { Navigate } from "react-router-dom";

export default function Login({ isLoggedIn }) {
  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }
  return <h1>Login Page</h1>;
}
