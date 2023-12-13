/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";

import { telegramInputPhoneCode } from "../actions/telegramActions";
import { TELEGRAM_CONNECT_CANCEL } from "../constants/telegramConstants";

export default function TelegramPhoneCodeModal({ telegramApiData }) {
  const { codeSent, phoneCodeHash } = useSelector((state) => state.telegramConnection);
  const [formData, setFormData] = useState({ code: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateFormData = (inputFormData) => {
    let errors = {};
    if (inputFormData.code === "") {
      errors.code = "Phone code cannot be empty";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateFormData(formData));
    setSubmitting(true);
  };

  const finishSubmit = () => {
    dispatch(telegramInputPhoneCode({ fullData: { ...formData, ...telegramApiData, ...{ phoneCodeHash: phoneCodeHash } } }));
  };

  const handleCancelConnection = () => {
    dispatch({ type: TELEGRAM_CONNECT_CANCEL });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <Modal isOpen={codeSent} placement="top-center" className="mt-10 mx-3">
      <ModalContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalHeader className="flex flex-col gap-1">Telegram connection code</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              name="code"
              id="code"
              label="Phone code"
              placeholder="Input the code you received in your phone"
              value={formData.code}
              required
              onChange={handleInputChange}
              isInvalid={!!errors.code}
              errorMessage={errors.code}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Send code
            </Button>
            <Button onPress={handleCancelConnection}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
