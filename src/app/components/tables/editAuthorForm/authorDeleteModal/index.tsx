import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
export default function AuthorDeleteModal({
  isOpen,
  onClose,
  handleDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex justifyContent={"space-between"} gap={"20px"} mt="20px">
            <Text fontWeight="700" fontSize={18}>
              Delete this author?
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
          <Flex w={"20px"}></Flex>

          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
          {/* <DevTool control={control} /> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
