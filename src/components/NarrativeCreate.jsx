/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { AddIcon } from "../assets/svg/AddIcon";
import { narrativeCreate } from "../actions/narrativeActions";

export default function NarrativeCreate() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({ title: "", description: "", image: null });
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
    dispatch(narrativeCreate(formData));
    setUploadedImageTitle("No image uploaded");
    setFormData({ title: "", description: "", image: null });
    onClose();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <>
      <Button className="m-3" color="primary" onPress={onOpen} variant="light">
        <div className="flex gap-1 items-center">
          <AddIcon width={20} />
          <span>CREATE NARRATIVE</span>
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" className="mt-10 mx-3">
        <ModalContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader className="flex flex-col gap-1 font-semibold">Create new narrative</ModalHeader>
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
                Upload image
              </Button>
              <p>{uploadedImageTitle}</p>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Create narrative
              </Button>
              <Button onPress={onClose}>Close</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
