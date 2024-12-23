import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
type DemoFinishModalProps = {
  isOpen: boolean;
  onClose: () => void;
  questionId: number;
};

import Link from "next/link";
import { WHITE_COLOR } from "@/constants/colors";

export const DemoFinishModal: FC<DemoFinishModalProps> = ({
  isOpen,
  onClose,
  questionId,
}) => {
  return (
    <Modal
      onClose={onClose}
      size="4xl"
      isOpen={isOpen}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg="#2E3856" borderRadius="16px">
        <ModalBody>
          <Flex
            bg="#2E3856"
            p="24px"
            width="100%"
            justifyContent="center"
            alignItems="center"
            height="400px"
            flexDir="column"
            gap="24px"
          >
            <Flex padding="6px" borderRadius="25px" bg="#C7F7E6">
              {" "}
              <Text fontFamily="sans-serif" fontSize="12px" fontWeight="700">
                Learned 7 terms
              </Text>
            </Flex>

            <Text
              fontFamily="sans-serif"
              fontWeight="700"
              fontSize="24px"
              color={WHITE_COLOR}
            >
              Well done, you are excellent.
            </Text>
            <Link href={`/quiz/see-quiz/${questionId}/study-mode`}>
              <Button
                bg={"#4255FF"}
                colorScheme="blue"
                color={WHITE_COLOR}
                width="100%"
                padding="30px"
              >
                <Text fontSize="20px" fontWeight="600" color={WHITE_COLOR}>
                  Continue using Study mode{" "}
                </Text>
              </Button>
            </Link>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
