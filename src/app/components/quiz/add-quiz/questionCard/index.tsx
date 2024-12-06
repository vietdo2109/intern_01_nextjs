import { useQuestion } from "@/components/services/queries";
import React, { Dispatch, SetStateAction } from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import { IconPencil, IconDelete } from "../../icons";
import Answer from "../answer";
import { QuestionFromDB } from "@/lib/models/quiz/quesion";
import { useDeleteQuestion } from "@/components/services/mutations";
export default function QuestionCard({
  index,
  questionId,
  openEditQuestionModal,
  setQuestionData,
}: {
  index: number;
  questionId: number;
  openEditQuestionModal: () => void;
  setQuestionData: Dispatch<SetStateAction<QuestionFromDB>>;
}) {
  const question = useQuestion(questionId);
  const deleteQuestion = useDeleteQuestion();
  if (question.data) {
    return (
      <Flex
        border="2px solid"
        borderRadius="10px"
        flexDir="column"
        minH="300px"
        key={questionId}
      >
        <Flex
          width="100%"
          padding="10px"
          paddingX="20px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="20" fontWeight="700">
            {index}
          </Text>
          <Flex height="100%" gap="20px">
            {" "}
            <Button
              width="30px"
              borderRadius="50%"
              bg="white"
              onClick={() => {
                console.log("click edit question with id: " + questionId);
                setQuestionData(question.data);
                openEditQuestionModal();
              }}
            >
              <IconPencil width={20} height={20} color="black" />
            </Button>
            <Button
              width="30px"
              borderRadius="50%"
              bg="white"
              onClick={() => {
                deleteQuestion.mutateAsync(questionId);
              }}
            >
              <IconDelete width={20} height={20} color="red" />
            </Button>
          </Flex>
        </Flex>
        <Box width="100%" border="1px solid"></Box>

        {/* Question showed */}
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          mt="20px"
          gap="20px"
          paddingX="20px"
          mb="20px"
        >
          <Text fontSize="24px" fontWeight="600">
            {question.data.questiontext}
          </Text>

          <AnswerLayout answerIds={question.data.answerids} />
        </Flex>
      </Flex>
    );
  }
}

export function AnswerLayout({ answerIds }: { answerIds: number[] }) {
  // Split the answers into two columns
  const half = Math.ceil(answerIds.length / 2);
  const firstColumn = answerIds.slice(0, half);
  const secondColumn = answerIds.slice(half);

  return (
    <Flex
      gap="100px"
      justifyContent="space-between"
      fontSize="24px"
      mt="10px"
      width="100%"
    >
      {" "}
      {/* First Column */}
      <Flex flex={1} justifyContent="center">
        <Flex flexDir="column" gap="40px">
          {firstColumn.map((answerId) => (
            <Answer answerId={answerId} key={answerId} />
          ))}
        </Flex>
      </Flex>
      {/* Second Column */}
      <Flex flex={1} justifyContent="center">
        <Flex flexDir="column" gap="40px">
          {secondColumn.map((answerId) => (
            <Answer answerId={answerId} key={answerId} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
