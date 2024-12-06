"use client";

import React, { Dispatch, useState } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { Montserrat } from "next/font/google";
import { GRAY_COLOR, GREEN_COLOR, WHITE_COLOR } from "@/constants/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAnswer, useQuestion, useQuiz } from "@/components/services/queries";
import { IconPencil, IconDelete } from "@/components/quiz/icons";
import { useDeleteQuiz } from "@/components/services/mutations";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Page({ params }: { params: { id: number } }) {
  const { isPending, error, data } = useQuiz(params.id);
  const [questionIndex, setQuestionIndex] = useState(0);
  const router = useRouter();
  const increaseQuestionIndex = () => {
    if (questionIndex < 6) {
      setQuestionIndex((prev) => prev + 1);
      console.log(questionIndex);
    }
  };

  const deleteQuiz = useDeleteQuiz();
  if (isPending) {
    <Text>Loading...</Text>;
  }

  if (error) {
    <Text>Fail to fetch quiz</Text>;
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
            flexDir="column"
            marginTop="30px"
            padding="24px"
            gap="10px"
            justifyContent="center"
            alignItems="center"
          >
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              gap="24px"
            >
              <Text fontSize="30px" fontWeight="700">
                {data.title}
              </Text>

              <Flex height="100%" gap="20px" alignItems="center">
                <Text fontWeight="700">
                  {data.questionids.length} questions
                </Text>{" "}
                <Link href={`/quiz/add-quiz/${data.id}`}>
                  <Button width="30px" borderRadius="50%" bg="white">
                    <IconPencil width={20} height={20} color="black" />
                  </Button>
                </Link>
                <Button
                  width="30px"
                  borderRadius="50%"
                  bg="white"
                  isLoading={deleteQuiz.isPending}
                  onClick={async () => {
                    router.push("/quiz");
                    await deleteQuiz.mutateAsync(data.id);
                  }}
                >
                  <IconDelete width={20} height={20} color="red" />
                </Button>
              </Flex>
            </Flex>

            <Box width="100%" height="4px" borderRadius="2px" bg="black"></Box>

            {data.questionids.length > 0 ? (
              <>
                <Flex width="100%">
                  <Text fontSize="26px" fontWeight="600" mt="20px">
                    Sample questions for this quiz{" "}
                  </Text>
                </Flex>

                <Flex
                  border="2px solid"
                  borderRadius="16px"
                  p="24px"
                  width="80%"
                  flexDir="column"
                  gap="24px"
                >
                  <Flex
                    width="100%"
                    justifyContent="space-between"
                    h="30px"
                    alignItems="center"
                  >
                    <Box bg={GRAY_COLOR} w="30px" h="30px"></Box>
                    <Text>{questionIndex + 1}/7</Text>
                    <Link href={`/quiz/see-quiz/${data.id}/study-mode`}>
                      <Button bg={GREEN_COLOR} color={WHITE_COLOR}>
                        <Text fontSize="20px" fontWeight="600">
                          Study mode{" "}
                        </Text>
                      </Button>
                    </Link>
                  </Flex>

                  <DemoQuestion
                    questionId={data.questionids[questionIndex]}
                    increaseQuestionIndex={increaseQuestionIndex}
                  />
                </Flex>
              </>
            ) : (
              <Text
                mt="30px"
                fontSize="20px"
                fontWeight="500"
                textAlign="center"
              >
                {
                  "This Quiz doesn't have any question, add some by clicking the pencil above"
                }
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

function DemoQuestion({
  questionId,
  increaseQuestionIndex,
}: {
  questionId: number;
  increaseQuestionIndex: () => void;
}) {
  const { isPending, error, data } = useQuestion(questionId);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const toggleIsAnswered = () => {
    setIsAnswered(!isAnswered);
  };
  if (isPending) {
    <Text>Loading...</Text>;
  }

  if (error) {
    <Text>Fail to fetch question</Text>;
  }

  if (data) {
    return (
      <>
        {" "}
        <Flex py="24px" gap="12px" flexDir="column">
          <Text fontSize="26px" fontWeight="700">
            {data.questiontext}
          </Text>

          <Flex paddingTop="20px">
            {isAnswered && isAnswerCorrect ? (
              <Text fontWeight="600" color={"#59E8B5"}>
                Niceeee!
              </Text>
            ) : isAnswered && !isAnswerCorrect ? (
              <Text fontWeight="600" color={"orange"}>
                Wrong answer! Try harder.
              </Text>
            ) : (
              <Text fontWeight="600">Choose the correct term</Text>
            )}
          </Flex>
          {data.answerids.map((answerId) => (
            <DemoAnswer
              key={answerId}
              answerId={answerId}
              isAnswered={isAnswered}
              isAnswerCorrect={isAnswerCorrect}
              setIsAnserCorrect={setIsAnswerCorrect}
              toggleIsAnswered={toggleIsAnswered}
            />
          ))}
        </Flex>
        <Flex width="100%" justifyContent="space-between">
          <Button
            border="none"
            bg={WHITE_COLOR}
            _hover={{ bg: "black", color: WHITE_COLOR }}
            disabled={isAnswered}
            onClick={() => {
              setIsAnswerCorrect(true);
              toggleIsAnswered();
            }}
          >
            <Text fontSize="20px" fontWeight="600">
              {"You don't know?"}
            </Text>
          </Button>
          <Button
            onClick={() => {
              toggleIsAnswered();
              setIsAnswerCorrect(false);
              increaseQuestionIndex();
            }}
            bg={GREEN_COLOR}
            colorScheme="green"
            color={WHITE_COLOR}
            disabled={!isAnswered}
          >
            <Text fontSize="20px" fontWeight="600">
              Next question{" "}
            </Text>
          </Button>
        </Flex>
      </>
    );
  }
}

function DemoAnswer({
  answerId,
  isAnswered,
  isAnswerCorrect,
  toggleIsAnswered,
  setIsAnserCorrect,
}: {
  answerId: number;
  isAnswered: boolean;
  isAnswerCorrect: boolean;
  setIsAnserCorrect: Dispatch<React.SetStateAction<boolean>>;
  toggleIsAnswered: () => void;
}) {
  const { isPending, error, data } = useAnswer(answerId);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleAnswerClicked = () => {
    console.log("clicked");
    setIsClicked(!isClicked);
    toggleIsAnswered();
    if (data?.iscorrect) {
      setIsAnserCorrect(true);
    }
  };
  if (isPending) {
    <Text>Loading...</Text>;
  }

  if (error) {
    <Text>Fail to fetch answer</Text>;
  }

  if (data) {
    return (
      <Button
        whiteSpace="normal"
        maxH="100px"
        paddingY="10px"
        bg={WHITE_COLOR}
        _disabled={{
          bg: `${!isClicked && !data.iscorrect ? "#EAEAEA" : WHITE_COLOR}`,
          cursor: "not-allowed",
        }}
        disabled={isAnswered}
        onClick={handleAnswerClicked}
        border={`2px ${
          isAnswered
            ? isAnswerCorrect
              ? data.iscorrect
                ? "solid #59E8B5"
                : "solid #EAEAEA"
              : data.iscorrect
              ? "dashed #59E8B5"
              : isClicked
              ? "solid orange"
              : "solid #EAEAEA"
            : "solid black"
        }`}
        p="24px"
      >
        <Flex padding="10px">
          <Text> {data.answertext}</Text>
        </Flex>
      </Button>
    );
  }
}
