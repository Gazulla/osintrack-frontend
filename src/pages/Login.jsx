import { Button, Card, Image, Input } from "@nextui-org/react";
import { Navigate } from "react-router-dom";
import PasswordInput from "../components/form/PasswordsInput";
import useLogin from "../hooks/useLogin";

export default function Login({ isLoggedIn, darkMode }) {
  const { error, handleLogin } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username: window.username.value, password: window.password.value });
  };
  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div className="flex flex-col items-center my-8 p-3">
      <Image alt="CAEI Shield" className="object-cover rounded-xl" src="/images/caei_shield.png" width={270} />
      <Card className="m-3 mt-10 p-4 pb-8 w-full sm:w-4/5 md:w-2/5 xl:w-1/4 items-center">
        <Image alt="OSINTRACK Logo" className="object-cover rounded-xl" src={`/images/osintrack${darkMode ? "_white" : ""}.svg`} width={270} />

        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3 w-full mt-5">
          <Input name="username" id="username" type="text" label="User" placeholder="Enter your username" />
          <PasswordInput name="password" id="password" />
          <Button type="submit" color="primary">
            Login
          </Button>
        </form>
        {error && <div className="text-red-600">{error}</div>}
      </Card>
    </div>
  );
}
