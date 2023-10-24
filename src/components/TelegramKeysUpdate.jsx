/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminSettingsUpdate } from "../actions/adminActions";
import { Button, Input } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function TelegramKeysUpdate({ settings }) {
  const [formData, setFormData] = useState({ ...settings });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateFormData = (inputFormData) => {
    let errors = {};
    if (inputFormData.telegramApiId === "") {
      errors.telegramApiId = "Telegram API ID cannot be empty";
    }
    if (inputFormData.telegramApiHash === "") {
      errors.telegramApiHash = "Telegram API Hash cannot be empty";
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
      dispatch(adminSettingsUpdate({ formData }));
      setSubmitting(false);
    }
  }, [errors]);

  return (
    <Card className="m-3">
      <CardHeader className="flex gap-3 ml-3 mt-3">
        <h2 className="flex gap-2 text-xl font-bold items-center">Telegram API keys</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
          <Input
            autoFocus
            name="telegramApiId"
            id="telegramApiId"
            label="Telegram API ID"
            placeholder="Telegram API ID"
            value={formData.telegramApiId}
            onChange={handleInputChange}
            isInvalid={!!errors.telegramApiId}
            errorMessage={errors.telegramApiId}
          />
          <Input
            name="telegramApiHash"
            id="telegramApiHash"
            label="Telegram API Hash"
            placeholder="Telegram API Hash"
            value={formData.telegramApiHash}
            onChange={handleInputChange}
            isInvalid={!!errors.telegramApiHash}
            errorMessage={errors.telegramApiHash}
          />
          <Button type="submit" color="primary">
            Update API keys
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
