/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { AddIcon } from "../assets/svg/AddIcon";
import { telegramGroupCheck } from "../actions/telegramActions";

export default function TelegramGroupAdd({ narrativeId }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({ telegramGroupIdentifier: "", narrativeId });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateFormData = (inputFormData) => {
    let errors = {};
    if (inputFormData.telegramGroupIdentifier === "") {
      errors.telegramGroupIdentifier = "Telegram identifier cannot be empty";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateFormData(formData));
    setSubmitting(true);
  };

  const finishSubmit = () => {
    dispatch(telegramGroupCheck(formData, narrativeId));
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <>
      <Button color="primary" onPress={onOpen} variant="light" size="sm">
        <div className="flex gap-1 items-center font-semibold">
          <AddIcon width={18} />
          <span>ADD GROUP</span>
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" className="mt-10 mx-3">
        <ModalContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader className="flex flex-col gap-1">Add Telegram group to the narrative</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                name="telegramGroupIdentifier"
                id="telegramGroupIdentifier"
                label="Telegram group identifier"
                placeholder="Group name or link"
                value={formData.telegramGroupIdentifier}
                required
                onChange={handleInputChange}
                isInvalid={!!errors.telegramGroupIdentifier}
                errorMessage={errors.telegramGroupIdentifier}
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Check group
              </Button>
              <Button onPress={onClose}>Close</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
