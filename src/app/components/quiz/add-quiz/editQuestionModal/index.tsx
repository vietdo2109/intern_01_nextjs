"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

import { QuizFromDB } from "@/lib/models/quiz/quiz";
import { QuestionFromDB } from "@/lib/models/quiz/quesion";

export default function EditQuestionModal({
  isOpen,
  onClose,
  quiz,
  question,
}: {
  isOpen: boolean;
  onClose: () => void;
  quiz: QuizFromDB;
  question: QuestionFromDB;
}) {
  console.log(quiz);
  console.log(question);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={"5xl"}
    >
      <ModalOverlay />
      <ModalContent className={montserrat.className}>
        {" Incomplete feature!"}
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
