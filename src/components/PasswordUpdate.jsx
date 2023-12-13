/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import HideVisibilityInput from "./form/HideVisibilityInput";
import { passwordUpdate } from "../actions/profileActions";

export default function PasswordUpdate() {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", newPasswordConfirm: "" });
  const { passwordError } = useSelector((state) => state.profile);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateFormData = (inputFormData) => {
    let errors = {};

    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;

    if (inputFormData.oldPassword === "") {
      errors.oldPassword = "Old password cannot be empty";
    }
    if (inputFormData.oldPassword.length > 50) {
      errors.oldPassword = "Old password is too long (max length 50 characters)";
    }
    if (inputFormData.newPassword === "") {
      errors.newPassword = "New password cannot be empty";
    }
    if (inputFormData.newPassword.length > 50) {
      errors.newPassword = "New password is too long (max length 50 characters)";
    }
    if (inputFormData.newPasswordConfirm === "") {
      errors.newPasswordConfirm = "New password confirmation cannot be empty";
    }
    if (inputFormData.newPasswordConfirm.length > 50) {
      errors.newPasswordConfirm = "New password confirmation is too long (max length 50 characters)";
    }
    if (inputFormData.newPassword !== inputFormData.newPasswordConfirm) {
      errors.newPassword = "New password and its confirmation must be the same";
      errors.newPasswordConfirm = "New password and its confirmation must be the same";
    }
    if (inputFormData.newPassword.match(regexp) === null) {
      errors.newPassword = "New password must have a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateFormData(formData));
    setSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      dispatch(passwordUpdate({ formData }));
      setSubmitting(false);
    }
  }, [errors]);

  return (
    <Card className="m-3">
      <CardHeader className="flex justify-between pl-5 pr-5 pt-5">
        <h2 className="flex gap-2 text-xl font-semibold items-center">Password update</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
          <HideVisibilityInput
            required
            name="oldPassword"
            id="oldPassword"
            label="Old password"
            placeholder="Old password"
            value={formData.oldPassword}
            onChange={handleInputChange}
            isInvalid={!!errors.oldPassword}
            errorMessage={errors.oldPassword}
          />
          <HideVisibilityInput
            required
            name="newPassword"
            id="newPassword"
            label="New password"
            placeholder="New password"
            value={formData.newPassword}
            onChange={handleInputChange}
            isInvalid={!!errors.newPassword}
            errorMessage={errors.newPassword}
          />
          <HideVisibilityInput
            required
            name="newPasswordConfirm"
            id="newPasswordConfirm"
            label="Confirm new password"
            placeholder="Confirm new password"
            value={formData.newPasswordConfirm}
            onChange={handleInputChange}
            isInvalid={!!errors.newPasswordConfirm}
            errorMessage={errors.newPasswordConfirm}
          />
          <Button type="submit" color="primary">
            Update password
          </Button>
          {passwordError && (
            <Card isBlurred className="border-none bg-red-500/20 text-red-500 p-2 text-sm" shadow="sm">
              {passwordError}
            </Card>
          )}
        </form>
      </CardBody>
    </Card>
  );
}
