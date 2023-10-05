import { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/svg/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/svg/EyeSlashFilledIcon";

export default function PasswordInput({ id, name }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      id={id}
      name={name}
      label="Password"
      placeholder="Enter your password"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}
