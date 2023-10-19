/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Tooltip } from "@nextui-org/react";
import { narrativeUpdate } from "../actions/narrativeActions";
import { EditIcon } from "../assets/svg/EditIcon";

export default function NarrativeUpdate({ narrative }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { _id, title, description, image } = narrative;
  const [formData, setFormData] = useState({ title: title, description: description, image: image });
  const [errors, setErrors] = useState({});
  const [uploadedImageTitle, setUploadedImageTitle] = useState("No image uploaded");
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUploadImageChange = (e) => {
    setUploadedImageTitle(document.getElementById("upload-input")?.value.replace(/.*[/\\]/, ""));
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateFormData = (inputFormData) => {
    let errors = {};
    if (inputFormData.title === "") {
      errors.title = "Title cannot be empty";
    }
    if (inputFormData.title.length > 50) {
      errors.title = "Title is too long (max length 50 characters)";
    }
    if (inputFormData.description === "") {
      errors.description = "Description cannot be empty";
    }
    if (inputFormData.description.length > 50) {
      errors.description = "Description is too long (max length is 50 characters)";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateFormData(formData));
    setSubmitting(true);
  };

  const finishSubmit = () => {
    dispatch(narrativeUpdate({ narrativeId: _id, formData }));
    setUploadedImageTitle("No image uploaded");
    setFormData({ title: "", description: "", image: null });
    onClose();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  useEffect(() => {
    setUploadedImageTitle(image.replace(/.*[/\\]/, ""));
  }, []);

  return (
    <>
      <Tooltip content="Edit narrative settings">
        <Button variant="light" isIconOnly onPress={onOpen} radius="full">
          <EditIcon width={18} />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" className="mt-10 mx-3">
        <ModalContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader className="flex flex-col gap-1">Edit narrative settings</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                name="title"
                id="title"
                label="Narrative title"
                placeholder="Title"
                value={formData.title}
                required
                onChange={handleInputChange}
                isInvalid={!!errors.title}
                errorMessage={errors.title}
              />
              <Input
                name="description"
                id="description"
                label="Narrative description"
                placeholder="Short description"
                value={formData.description}
                required
                onChange={handleInputChange}
                isInvalid={!!errors.description}
                errorMessage={errors.description}
              />
              <Button className="p-0" color="primary">
                <label className="absolute w-full h-full cursor-pointer">
                  <input onChange={(e) => handleUploadImageChange(e)} id="upload-input" type="file" accept="image/*" className="hidden" />
                </label>
                Upload new image
              </Button>
              <p>{`Current image: ${uploadedImageTitle}`}</p>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Update narrative
              </Button>
              <Button onPress={onClose}>Close</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
