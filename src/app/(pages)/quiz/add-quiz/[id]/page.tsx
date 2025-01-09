"use client";
import { Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/header";
import { GREEN_COLOR, WHITE_COLOR } from "@/constants/colors";
import AddQuestionModal from "@/components/quiz/addQuestionModal";
import { useQuiz } from "@/services/queries";
import { useContext, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QuestionCard from "@/components/quiz/add-quiz/questionCard";
import EditQuestionModal from "@/components/quiz/add-quiz/editQuestionModal";
import { QuestionFromDB } from "@/lib/models/quiz/quesion";
import { QuestionsContext } from "../../quizContext/QuizContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export type Quiz = {
  id: number;
  userId: number;
  title: string;
  description: string;
  questionIds: number[];
};

export type Question = {
  id: number;
  questionText: string;
  answerIds: number[];
};

export type Answer = {
  id: number;
  answerText: string;
  isCorrect: boolean;
};

export default function Page({ params }: { params: { id: number } }) {
  const newQuizId = params.id;
  const newQuiz = useQuiz(newQuizId);
  const questionContext = useContext(QuestionsContext);
  let index = 0;
  // let answersList: Answer[] = [];
  const [questionDataForEditing, setQuestionDataForEditing] =
    useState<QuestionFromDB>({
      id: -1,
      quizid: -1,
      questiontext: "",
      answerids: [],
    });

  const {
    isOpen: isAddQuestionModalOpen,
    onOpen: onAddQuestionModalOpen,
    onClose: onAddQuestionModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditQuestionModalOpen,
    onOpen: onEditQuestionModalOpen,
    onClose: onEditQuestionModalClose,
  } = useDisclosure();

  if (newQuiz.data) {
    return (
      <Flex
        className={montserrat.className}
        width="100%"
        minW="700px"
        zIndex={1}
        right={0}
        flexDir="column"
        paddingBottom={"20px"}
        minH="100vh"
        padding="24px"
        gap="24px"
      >
        <AddQuestionModal
          quiz={newQuiz.data}
          onClose={onAddQuestionModalClose}
          isOpen={isAddQuestionModalOpen}
        />

        <EditQuestionModal
          quiz={newQuiz.data}
          question={questionDataForEditing}
          onClose={onEditQuestionModalClose}
          isOpen={isEditQuestionModalOpen}
        />

        {/*  Header  */}
        <Flex w={"100%"}>
          <Header theme="dark" page="Quizlet mini / Create quiz" />
        </Flex>

        {/*  main section  */}
        <Flex
          bg={WHITE_COLOR}
          minH="90vh"
          borderRadius="16px"
          flexDir="column"
          gap="24px"
          padding="24px"
        >
          <Flex width="100%" justifyContent="space-between" alignItems="center">
            <Text fontWeight="700" fontSize="26">
              {newQuiz.data.title}{" "}
            </Text>
          </Flex>

          <Button
            width="100px"
            bg={GREEN_COLOR}
            color={WHITE_COLOR}
            colorScheme="teal"
            onClick={onAddQuestionModalOpen}
          >
            + Enter
          </Button>
          <Text>{questionContext?.length}</Text>
          <Flex flexDir="column" gap="40px">
            {/* fetching api/quizzes here to renter all quized, "+ Enter" to add a new quizz, after adding, revalidate this */}

            {newQuiz.data.questionids.map((questionId) => {
              index = index + 1;
              return (
                <QuestionCard
                  key={index}
                  index={index}
                  questionId={questionId}
                  openEditQuestionModal={onEditQuestionModalOpen}
                  setQuestionData={setQuestionDataForEditing}
                />
              );
            })}
            <Button
              width="100px"
              bg={GREEN_COLOR}
              color={WHITE_COLOR}
              colorScheme="teal"
              onClick={onAddQuestionModalOpen}
            >
              + Enter
            </Button>
          </Flex>
        </Flex>
        <ReactQueryDevtools initialIsOpen={false} />
      </Flex>
    );
  }
}
