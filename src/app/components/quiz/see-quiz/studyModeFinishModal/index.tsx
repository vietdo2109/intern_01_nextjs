import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Button,
  Text,
  Divider,
} from "@chakra-ui/react";
type StudyModeFinishModalProps = {
  isOpen: boolean;
  onClose: () => void;
  questionId: number;
  record: StudyModeResult[] | [];
};

import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import Link from "next/link";
import { GRAY_COLOR, WHITE_COLOR } from "@/constants/colors";
import { StudyModeResult } from "@/(pages)/quiz/see-quiz/[id]/study-mode/page";

export const StudyModeFinishModal: FC<StudyModeFinishModalProps> = ({
  isOpen,
  onClose,
  questionId,
  record,
}) => {
  let correctAnswersCount = 0;
  record.forEach((data) => {
    if (data.isAnsweredCorrectly) {
      correctAnswersCount++;
    }
  });
  const accuracy = (correctAnswersCount / record.length) * 100;
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      size="5xl"
      closeOnOverlayClick={false}
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent borderRadius="16px" border="2px solid">
        <ModalBody>
          <Flex
            p="24px"
            width="100%"
            alignItems="center"
            flexDir="column"
            gap="24px"
          >
            <Flex width="100%" justifyContent="center" position="relative">
              {" "}
              <Text fontFamily="sans-serif" fontSize="24px" fontWeight="700">
                Congratulations!{" "}
              </Text>
              <Button
                bg={"white"}
                position="absolute"
                right="0"
                border="2px solid"
                _hover={{ bg: "black", color: WHITE_COLOR }}
              >
                {/* <Icon as={HiMiniXMark} width="20px" height="20px"></Icon> */}
              </Button>
            </Flex>

            <Flex width="100%" gap="24px">
              <Flex
                borderRadius="12px"
                flex="1"
                border="2px solid"
                padding="12px"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="18px" fontWeight={500} alignSelf="center">
                  Correct answers:
                </Text>{" "}
                <Text fontSize="18px" fontWeight={700} alignSelf="center">
                  {correctAnswersCount}/17
                </Text>{" "}
              </Flex>
              <Flex
                borderRadius="12px"
                flex="1"
                border="2px solid"
                padding="12px"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="18px" fontWeight={500} alignSelf="center">
                  Accuracy:
                </Text>
                <Text fontSize="18px" fontWeight={700} alignSelf="center">
                  {accuracy.toFixed(2)}%
                </Text>
              </Flex>
            </Flex>

            <Flex width="100%" flexDir="column" gap={"24px"}>
              {record.map((data, index) => (
                <Flex
                  key={index}
                  width="100%"
                  borderRadius="12px"
                  border="2px solid"
                  overflow="hidden"
                  minH="200px"
                >
                  <Flex
                    width="16px"
                    minHeight="100%"
                    bg={data.isAnsweredCorrectly ? "#59E8B5" : "#ff8787"}
                  ></Flex>
                  <Flex flexDir="column" width="100%" padding="24px" gap="10px">
                    <Text fontWeight="700">{data.questionText}</Text>
                    <Divider />
                    <Flex flexDir="column" gap="10px">
                      {data.answers?.map((answer) => (
                        <Flex
                          key={answer.answerId}
                          width="100%"
                          border={
                            data.chosenAsnwerId === answer.answerId
                              ? data.isAnsweredCorrectly
                                ? "2px solid #59E8B5"
                                : "2px solid #ff8787"
                              : answer.isCorrect
                              ? `2px solid ${GRAY_COLOR}`
                              : ""
                          }
                          justifyContent="space-between"
                          borderRadius="10px"
                          padding="8px"
                          alignItems="center"
                        >
                          {" "}
                          <Text>{answer.answerText}</Text>
                          {data.chosenAsnwerId === answer.answerId ? (
                            data.isAnsweredCorrectly ? (
                              <FaCheckCircle color="#59E8B5" />
                            ) : (
                              <FaCircleXmark color="#ff8787" />
                            )
                          ) : answer.isCorrect ? (
                            <FaCheckCircle color={GRAY_COLOR} />
                          ) : (
                            ""
                          )}
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>
            <Flex width="100%" justifyContent="space-between">
              <Link href={`/quiz/see-quiz/${questionId}/study-mode`}>
                <Button
                  bg={"white"}
                  width="100%"
                  padding="30px"
                  border="2px solid"
                  _hover={{ bg: "black", color: WHITE_COLOR }}
                >
                  <Text fontSize="20px" fontWeight="700">
                    Try again{" "}
                  </Text>
                </Button>
              </Link>

              <Link href={`/quiz`}>
                <Button
                  bg={"white"}
                  width="100%"
                  padding="30px"
                  border="2px solid"
                  _hover={{ bg: "black", color: WHITE_COLOR }}
                >
                  <Text fontSize="20px" fontWeight="700">
                    Try other quizzes{" "}
                  </Text>
                </Button>
              </Link>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
