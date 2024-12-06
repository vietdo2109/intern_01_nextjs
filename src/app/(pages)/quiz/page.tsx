"use client";

import React from "react";
import { Flex, Box, Text, Button, useDisclosure } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { GRAY_COLOR, GRAY_TEXT_COLOR, WHITE_COLOR } from "@/constants/colors";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import CreateQuizConfirmModal from "@/components/quiz/createQuizConfirmModal";
import { useQuiz, useUserDTOQuizIds } from "@/components/services/queries";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Page() {
  const {
    isOpen: isCreatQuizConfirmModalOpen,
    onOpen: onCreatQuizConfirmModalOpen,
    onClose: onCreatQuizConfirmModalClose,
  } = useDisclosure();

  const { isPending, error, data } = useUserDTOQuizIds();

  if (error) {
    return <Text>fail to fetch</Text>;
  }

  if (isPending) {
    return <Text>loading ...</Text>;
  }

  if (data) {
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
        {/*  Header  */}
        <Flex w={"100%"}>
          <Header theme="dark" page="Quizlet mini" />
        </Flex>

        {/* Top section */}
        <Flex
          bg={WHITE_COLOR}
          minH="100vh"
          borderRadius="16px"
          flexDir="column"
          gap="24px"
        >
          <Flex
            width="100%"
            flexDir="row"
            justifyContent="center"
            alignItems="center"
            padding="24px"
            position="relative"
          >
            {/* Search Bar */}
            <Box
              width="40%"
              height="45px"
              bg={GRAY_COLOR}
              borderRadius="10px"
            ></Box>

            {/* Avatar */}
            <Box
              position="absolute"
              right="24px"
              top="24px"
              width="45px"
              height="45px"
              borderRadius="50%"
              bg={GRAY_COLOR}
            ></Box>
          </Flex>

          {/* main section */}

          <Flex flexDir="column" marginTop="30px" padding="24px" gap="10px">
            <Flex width="100%" justifyContent="space-between">
              <Text fontSize="30px" fontWeight="700">
                Your Library
              </Text>
              {/* <Link href={`/quiz/add-quiz`}> */}
              <Button onClick={onCreatQuizConfirmModalOpen}>
                <Text fontSize="20px" fontWeight="600">
                  Create quiz
                </Text>
              </Button>
              {/* </Link> */}
            </Flex>

            <Box width="100%" height="4px" borderRadius="2px" bg="black"></Box>
          </Flex>

          <Flex gap="24px" padding="0 24px" flexWrap="wrap">
            {data.quizzesIds.map((quizId) => {
              return <QuizCard quizId={quizId} key={quizId} />;
            })}
          </Flex>
        </Flex>
        <CreateQuizConfirmModal
          // quiz={quiz}
          // modifyQuiz={setQuiz}
          onClose={onCreatQuizConfirmModalClose}
          isOpen={isCreatQuizConfirmModalOpen}
        />
      </Flex>
    );
  }
}

function QuizCard({ quizId }: { quizId: number }) {
  const quiz = useQuiz(quizId);

  if (quiz.data) {
    return (
      <Flex
        width="49%"
        border="1px solid"
        height="200px"
        borderRadius="16px"
        flexDir="column"
        padding={"24px"}
      >
        <Link href={`/quiz/see-quiz/${quizId}`}>
          <Text fontSize={"18px"}>{quiz.data.questionids.length}</Text>
          <Text fontSize={"24px"} fontWeight="700">
            {quiz.data.title}
          </Text>
          <Flex flex={1} justifyContent="flex-end" alignItems="end">
            <Text color={GRAY_TEXT_COLOR} fontWeight="700" textAlign="right">
              Last modified
            </Text>
          </Flex>{" "}
        </Link>
      </Flex>
    );
  }
}
