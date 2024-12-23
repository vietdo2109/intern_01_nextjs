"use client";

import { useAnswer, useQuestion, useQuiz } from "@/components/services/queries";
import { Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { GREEN_COLOR, WHITE_COLOR } from "@/constants/colors";
import { StudyModeFinishModal } from "@/components/quiz/see-quiz/studyModeFinishModal";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Page({ params }: { params: { id: number } }) {
  const { isPending, error, data } = useQuiz(params.id);
  const [questionIndex, setQuestionIndex] = useState(0);
  //   const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [studyModeResult, setStudyModeResult] = useState<
    StudyModeResult[] | []
  >([]);

  if (isPending) {
    <Text>Loading...</Text>;
  }

  if (error) {
    <Text>Fail to fetch quiz</Text>;
  }

  if (data) {
    const increaseQuestionIndex = () => {
      if (questionIndex + 1 < data.questionids.length) {
        setQuestionIndex((prev) => prev + 1);
        console.log(questionIndex);
      } else {
        onOpen();
      }
    };
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
        {/* demo finish modal */}
        <StudyModeFinishModal
          isOpen={isOpen}
          onClose={onClose}
          questionId={data.id}
          record={studyModeResult}
        />
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
              justifyContent="center"
              alignItems="center"
              gap="24px"
            >
              <Text fontSize="20px" fontWeight="600">
                {data.title}
              </Text>
              {/* <Text>{data.questionids.length} questions</Text> */}
            </Flex>

            {/* process bar */}
            <Flex
              padding="10px"
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              gap="30px"
            >
              <Flex
                w="80px"
                h="30px"
                border="2px solid"
                borderRadius="15px"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontWeight="600" fontSize="20px">
                  {questionIndex + 1 <= data.questionids.length
                    ? questionIndex + 1
                    : data.questionids.length}
                </Text>
              </Flex>
              <Flex
                h="28px"
                p="3px"
                // bg="#586380"
                borderRadius="15px"
                alignItems="center"
                w="100%"
                border=" 2px solid"
              >
                <Flex
                  h="20px"
                  bg="black"
                  borderRadius="15px"
                  w={`${
                    ((questionIndex + 1) / data.questionids.length) * 100
                  }%`}
                  transition="width 0.3s ease-in-out"
                ></Flex>
              </Flex>
              <Flex
                w="80px"
                h="30px"
                border="2px solid"
                borderRadius="15px"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontWeight="600" fontSize="20px">
                  {data.questionids.length}
                </Text>
              </Flex>
            </Flex>

            {data.questionids.length > 0 ? (
              <>
                <Flex width="100%"></Flex>

                <Flex
                  border="2px solid"
                  borderRadius="16px"
                  p="24px"
                  width="80%"
                  flexDir="column"
                  gap="24px"
                >
                  <DemoQuestion
                    questionId={data.questionids[questionIndex]}
                    increaseQuestionIndex={increaseQuestionIndex}
                    questionIndex={questionIndex}
                    numberOfQuestions={data.questionids.length}
                    studyModeResult={studyModeResult}
                    setStudyModeResult={setStudyModeResult}
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
  questionIndex,
  numberOfQuestions,
  studyModeResult,
  setStudyModeResult,
}: {
  questionId: number;
  increaseQuestionIndex: () => void;
  questionIndex: number;
  numberOfQuestions: number;
  studyModeResult: StudyModeResult[] | undefined;
  setStudyModeResult: Dispatch<SetStateAction<StudyModeResult[] | []>>;
}) {
  const { isPending, error, data } = useQuestion(questionId);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const toggleIsAnswered = () => {
    setIsAnswered(!isAnswered);
  };

  const handleAddQuestionData = () => {
    if (data) {
      setStudyModeResult((prev) => {
        if (prev) {
          return [
            ...prev,
            {
              questionId: data.id,
              questionText: data.questiontext,
              isAnsweredCorrectly: false,
            },
          ];
        } else {
          return [
            {
              questionId: data.id,
              questionText: data.questiontext,
              isAnsweredCorrectly: false,
            },
          ];
        }
      });
    }
  };

  if (isPending) {
    <Text>Loading...</Text>;
  }

  if (error) {
    <Text>Fail to fetch question</Text>;
  }

  useEffect(() => {
    handleAddQuestionData();
  }, [data, handleAddQuestionData]);
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
              setIsAnswerCorrect={setIsAnswerCorrect}
              toggleIsAnswered={toggleIsAnswered}
              studyModeResult={studyModeResult}
              setStudyModeResult={setStudyModeResult}
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
            disabled={!isAnswered || questionIndex >= numberOfQuestions}
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
  setIsAnswerCorrect,
  setStudyModeResult,
}: {
  answerId: number;
  isAnswered: boolean;
  isAnswerCorrect: boolean;
  setIsAnswerCorrect: Dispatch<React.SetStateAction<boolean>>;
  toggleIsAnswered: () => void;
  studyModeResult: StudyModeResult[] | undefined;
  setStudyModeResult: Dispatch<SetStateAction<StudyModeResult[] | []>>;
}) {
  const { isPending, error, data } = useAnswer(answerId);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleAnswerClicked = () => {
    console.log("data DemoAnswer", data);
    setIsClicked(!isClicked);
    toggleIsAnswered();
    if (data?.iscorrect) {
      setIsAnswerCorrect(true);
    }
    handleAddChosenAnswer();
  };

  const handleAddChosenAnswer = () => {
    console.log("isAnswerCorrect", isAnswerCorrect);

    setStudyModeResult(
      (
        prev = [] // Default `prev` to an empty array
      ) =>
        prev.map((question) =>
          question.questionId === data?.questionid
            ? {
                ...question,
                isAnsweredCorrectly: data.iscorrect,
                chosenAsnwerId: data.id,
              }
            : question
        )
    );
  };
  if (isPending) {
    <Text>Loading...</Text>;
  }

  if (error) {
    <Text>Fail to fetch answer</Text>;
  }

  const handleAddAnswer = (fetchedAnswer: {
    id: number;
    questionid: number;
    answertext: string;
    iscorrect: boolean;
  }) => {
    setStudyModeResult(
      (
        prev = [] // Default `prev` to an empty array
      ) =>
        prev.map((question) =>
          question.questionId === fetchedAnswer.questionid
            ? {
                ...question,
                answers: [
                  ...(question.answers || []), // Ensure `answers` is an array
                  {
                    answerId: fetchedAnswer.id,
                    answerText: fetchedAnswer.answertext,
                    isCorrect: fetchedAnswer.iscorrect,
                  },
                ],
              }
            : question
        )
    );
  };

  useEffect(() => {
    if (data) {
      handleAddAnswer(data);
    }
  }, [data, handleAddAnswer]);
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
export type StudyModeResult = {
  questionId: number;
  questionText: string;
  answers?: {
    answerId: number;
    answerText: string;
    isCorrect: boolean;
  }[];
  isAnsweredCorrectly: boolean;
  chosenAsnwerId?: number;
};
