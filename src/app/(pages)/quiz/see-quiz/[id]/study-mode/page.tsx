"use client";

import { useAnswer, useQuestion, useQuiz } from "@/components/services/queries";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Dispatch, useState } from "react";
import { Montserrat } from "next/font/google";
import { GREEN_COLOR, WHITE_COLOR } from "@/constants/colors";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Page({ params }: { params: { id: number } }) {
  const { isPending, error, data } = useQuiz(params.id);
  const [questionIndex, setQuestionIndex] = useState(0);
  //   const router = useRouter();

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
                  {questionIndex + 1}
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
}: {
  questionId: number;
  increaseQuestionIndex: () => void;
  questionIndex: number;
  numberOfQuestions: number;
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
            disabled={!isAnswered || questionIndex + 1 >= numberOfQuestions}
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
