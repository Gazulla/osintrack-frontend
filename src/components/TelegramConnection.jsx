/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSettingsUpdate } from "../actions/adminActions";
import { Button, Chip } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { telegramConnect, telegramDisconnect } from "../actions/telegramActions";
import TelegramPhoneCodeModal from "./TelegramPhoneCodeModal";
import HideVisibilityInput from "./form/HideVisibilityInput";
import { TelegramIcon } from "../assets/svg/TelegramIcon";

export default function TelegramConnection({ settings }) {
  const { connected } = useSelector((state) => state.telegramConnection);
  const [formData, setFormData] = useState({ ...settings });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateFormData = (inputFormData) => {
    let errors = {};
    if (inputFormData.telegramPhone === "") {
      errors.telegramPhone = "Telegram phone cannot be empty";
    }
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

  const handleTelegramConnect = () => {
    dispatch(telegramConnect({ formData }));
  };

  const handleTelegramDisconnect = () => {
    dispatch(telegramDisconnect());
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      dispatch(adminSettingsUpdate({ formData }));
      setSubmitting(false);
    }
  }, [errors]);

  return (
    <Card className="m-3">
      <CardHeader className="flex justify-between pl-5 pr-5 pt-5">
        <h2 className="flex gap-2 text-xl font-semibold items-center">Telegram connection</h2>
        {connected ? (
          <Chip startContent={<TelegramIcon width={20} />} variant="faded" color="success">
            Connected
          </Chip>
        ) : (
          <Chip startContent={<TelegramIcon width={20} />} variant="faded" color="danger">
            Disconnected
          </Chip>
        )}
      </CardHeader>
      <CardBody>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
          <HideVisibilityInput
            name="telegramPhone"
            id="telegramPhone"
            label="Telegram phone"
            placeholder="Telegram phone"
            description='Remember to put your country prefix without "+": e.g. 34111222333, being 34 the prefix.'
            value={formData.telegramPhone}
            onChange={handleInputChange}
            isInvalid={!!errors.telegramPhone}
            errorMessage={errors.telegramPhone}
          />
          <HideVisibilityInput
            name="telegramApiId"
            id="telegramApiId"
            label="Telegram API ID"
            placeholder="Telegram API ID"
            description={
              <span>
                Get your Telegram API ID{" "}
                <a className="text-blue-400" target="_blank" rel="noreferrer" href="https://my.telegram.org/">
                  here
                </a>
              </span>
            }
            value={formData.telegramApiId}
            onChange={handleInputChange}
            isInvalid={!!errors.telegramApiId}
            errorMessage={errors.telegramApiId}
          />
          <HideVisibilityInput
            name="telegramApiHash"
            id="telegramApiHash"
            label="Telegram API Hash"
            placeholder="Telegram API Hash"
            description={
              <span>
                Get your Telegram API Hash{" "}
                <a className="text-blue-400" target="_blank" rel="noreferrer" href="https://my.telegram.org/">
                  here
                </a>
              </span>
            }
            value={formData.telegramApiHash}
            onChange={handleInputChange}
            isInvalid={!!errors.telegramApiHash}
            errorMessage={errors.telegramApiHash}
          />
          <Button type="submit" color="primary">
            Save connection settings
          </Button>

          {connected ? (
            <Button color="danger" onPress={handleTelegramDisconnect}>
              Disconnect
            </Button>
          ) : (
            <Button color="success" onPress={handleTelegramConnect}>
              Connect
            </Button>
          )}
        </form>
        <TelegramPhoneCodeModal telegramApiData={formData} />
      </CardBody>
    </Card>
  );
}
