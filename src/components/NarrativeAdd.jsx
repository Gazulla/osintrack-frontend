import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { AddIcon } from "../assets/svg/AddIcon";

export default function NarrativeAdd() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="fixed right-0 m-6 z-30" color="primary" onPress={onOpen} variant="shadow">
        <div className="flex gap-1 items-center">
          <AddIcon width={20} />
          <span>Add narrative</span>
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" className="mt-10 mx-3">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create new narrative</ModalHeader>
              <ModalBody>
                <Input autoFocus label="Narrative title" placeholder="Title" />
                <Input label="Narrative description" placeholder="Short description" />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
