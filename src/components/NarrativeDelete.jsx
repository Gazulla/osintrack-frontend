/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Tooltip } from "@nextui-org/react";
import { narrativeDelete } from "../actions/narrativeActions";
import { DeleteIcon } from "../assets/svg/DeleteIcon";
import { useNavigate } from "react-router-dom";

export default function NarrativeDelete({ narrative }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { _id, title } = narrative;
  const [formData, setFormData] = useState({ title: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateFormData = (inputFormData) => {
    let errors = {};
    if (inputFormData.title !== title) {
      errors.title = "Narrative title does not match";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateFormData(formData));
    setSubmitting(true);
  };

  const finishSubmit = async () => {
    await dispatch(narrativeDelete({ narrativeId: _id }));
    navigate("/");
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <>
      <Tooltip color="danger" content="Delete narrative">
        <Button color="danger" variant="light" isIconOnly onPress={onOpen} radius="full">
          <DeleteIcon width={18} />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" className="mt-10 mx-3">
        <ModalContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader className="flex flex-col gap-1 font-semibold">Delete narrative</ModalHeader>
            <ModalBody>
              <p>
                Write the title of the narrative <span className="font-bold">{`"${title}"`}</span> to permanently delete it
              </p>
              <Input
                autoFocus
                name="title"
                id="title"
                label="Write the title of the narrative"
                placeholder="Title"
                value={formData.title}
                required
                onChange={handleInputChange}
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                isInvalid={!!errors.title}
                errorMessage={errors.title}
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="danger">
                Delete narrative
              </Button>
              <Button onPress={onClose}>Close</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
