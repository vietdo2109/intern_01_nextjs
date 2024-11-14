import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Flex,
  Button,
} from "@chakra-ui/react";
export default function SeeImageModal({
  isOpen,
  onClose,
  image,
}: {
  isOpen: boolean;
  onClose: () => void;
  image: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex
            borderRadius="16px"
            marginTop="20px"
            width="400px"
            height="300px"
            bg={"lightgray"}
            overflow="hidden"
          >
            <img
              src={image}
              alt="avatar"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                backgroundPosition: "center",
              }}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>

          {/* <DevTool control={control} /> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
