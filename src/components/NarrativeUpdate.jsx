/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Tooltip } from "@nextui-org/react";
import { narrativeCreate } from "../actions/narrativeActions";
import { ConfigIcon } from "../assets/svg/ConfigIcon";

export default function NarrativeUpdate() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({ title: "", description: "", image: null });
  const [errors, setErrors] = useState({});
  const [uploadedImageTitle, setUploadedImageTitle] = useState("No image uploaded");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const narratives = useSelector((state) => state.narrativeList.list);

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
    if (inputFormData.title.length > 100) {
      errors.title = "Title is too long (max length 100 characters)";
    }
    if (inputFormData.description === "") {
      errors.description = "Description cannot be empty";
    }
    if (inputFormData.description.length > 100) {
      errors.description = "Description is too long (max length is 100 characters)";
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
    const lastNarrativeId = narratives[narratives.length - 1]._id + 1;
    navigate(`/narratives/${lastNarrativeId}`);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <>
      <Tooltip content="Config narrative settings">
        <Button variant="light" isIconOnly onPress={onOpen} radius="full">
          <ConfigIcon width={18} />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" className="mt-10 mx-3">
        <ModalContent>
          {(onClose) => (
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
                  Upload image
                </Button>
                <p>{uploadedImageTitle}</p>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  Create
                </Button>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
