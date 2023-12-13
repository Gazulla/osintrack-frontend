/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { profileUpdate } from "../actions/profileActions";

export default function ProfileData({ user }) {
  const [formData, setFormData] = useState({ ...user });
  const { error } = useSelector((state) => state.profile);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateFormData = (inputFormData) => {
    let errors = {};

    // Email regular expression
    const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;

    if (inputFormData.firstName.length > 50) {
      errors.firstName = "First name is too long (max length 50 characters)";
    }
    if (inputFormData.lastName.length > 50) {
      errors.lastName = "Last name is too long (max length 50 characters)";
    }
    if (inputFormData.email.length > 100) {
      errors.email = "Email is too long (max length 100 characters)";
    }
    if (inputFormData.email.match(regexp) === null) {
      errors.email = "Invalid email format";
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
      dispatch(profileUpdate({ formData }));
      setSubmitting(false);
    }
  }, [errors]);

  return (
    <Card className="m-3">
      <CardHeader className="flex justify-between pl-5 pr-5 pt-5">
        <h2 className="flex gap-2 text-xl font-semibold items-center">Profile data ({user.username})</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
          <Input
            name="firstName"
            id="firstName"
            label="First name"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName}
          />
          <Input
            name="lastName"
            id="lastName"
            label="Last name"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName}
          />
          <Input
            name="email"
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
            errorMessage={errors.email}
          />
          <Button type="submit" color="primary">
            Update profile
          </Button>
          {error && (
            <Card isBlurred className="border-none bg-red-500/20 text-red-500 p-2 text-sm" shadow="sm">
              {error}
            </Card>
          )}
        </form>
      </CardBody>
    </Card>
  );
}
