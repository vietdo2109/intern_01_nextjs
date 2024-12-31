"use client";

import { GRAY_TEXT_COLOR, WHITE_COLOR } from "@/constants/colors";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Flex,
  Textarea,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
import { useState } from "react";
const montserrat = Montserrat({ subsets: ["latin"] });
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateAnswer,
  useCreateQuestion,
  useEditQuestion,
  useEditQuiz,
} from "@/components/services/mutations";

import { QuizFromDB } from "@/lib/models/quiz/quiz";

export const questionSchema = yup.object({
  questionText: yup.string().required("Question is now empty!"),
  answers: yup
    .array(
      yup
        .object()
        .shape({
          answerText: yup.string().required("Answer text is required!"),
          isCorrect: yup.boolean().default(false),
        })
        .required("This field is required.")
    )
    .required(),
});

export type QuestionData = {
  id?: number;
  questionText: string;
  answers: { id?: number; answerText: string; isCorrect: boolean }[];
};

export default function AddQuestionModal({
  isOpen,
  onClose,
  quiz,
}: {
  isOpen: boolean;
  onClose: () => void;
  quiz: QuizFromDB;
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isLoading },
    trigger,
  } = useForm<QuestionData>({
    defaultValues: {
      questionText: "",
      answers: Array(4).fill({ answerText: "", isCorrect: false }),
    },
    resolver: yupResolver(questionSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "answers", // unique name for your Field Array,
    rules: { minLength: 2, maxLength: 5 },
  });

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(6);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);
  const createAnswer = useCreateAnswer();
  const createQuestion = useCreateQuestion();
  const updateQuiz = useEditQuiz();
  const updateQuestion = useEditQuestion();

  const onSubmit = async (data: QuestionData) => {
    if (correctAnswerIndex + 1 <= fields.length) {
      try {
        // Mark the correct answer
        try {
          data.answers[correctAnswerIndex].isCorrect = true;
        } catch (error) {
          console.log(error);
        }

        // Step 1: Create the question with `quizId`
        const createQuestionResponse = await createQuestion.mutateAsync({
          quizid: quiz.id, // Pass the quiz ID for the foreign key
          questiontext: data.questionText,
          answerids: [],
        });

        const newQuestionId = createQuestionResponse.id; // Get the newly created question ID

        // Step 2: Create answers linked to the new question
        const answersIds = await Promise.all(
          data.answers.map(async (answer) => {
            const response = await createAnswer.mutateAsync({
              questionid: newQuestionId, // Pass the question ID for the foreign key
              answertext: answer.answerText,
              iscorrect: answer.isCorrect,
            });
            return response.id; // Return the answer ID
          })
        );

        const updatedQuestion = {
          id: newQuestionId,
          quizid: quiz.id, // Pass the quiz ID for the foreign key
          questiontext: data.questionText,
          answerids: answersIds,
        };

        await updateQuestion.mutateAsync({
          ...updatedQuestion,
        });

        // Step 3: Update the quiz with the new question ID
        const updatedQuiz = {
          ...quiz,
          questionids:
            quiz.questionids.length > 0
              ? [...quiz.questionids, newQuestionId]
              : [newQuestionId],
        };

        await updateQuiz.mutateAsync({
          ...updatedQuiz,
        });
        // Reset form and close modal
        reset();
        onClose();
      } catch (error) {
        console.error("Error creating question and answers:", error);
      }
    } else {
      console.log("no correct answer chosen!");
    }
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="6xl"
    >
      <ModalOverlay />
      <ModalContent className={montserrat.className}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader></ModalHeader>

          <ModalBody pb={6}>
            <Flex w="100%" flexDir="column" gap="20px">
              <Textarea
                padding="20px"
                {...register("questionText")}
                border={`2px solid ${GRAY_TEXT_COLOR}`}
                fontWeight="600"
                whiteSpace="balance"
                textAlign="center"
                h="300px"
                fontSize={"24px"}
                width="100%"
                placeholder="Enter question here..."
              />
              <Flex gap="20px" width="100%">
                <RadioGroup
                  name="isCorrect"
                  display="flex"
                  gap="20px"
                  width="100%"
                >
                  {fields.map((field, index) => (
                    <Flex
                      position="relative"
                      border={`2px solid ${GRAY_TEXT_COLOR}`}
                      flexDir="column"
                      borderRadius="6px"
                      overflow="hidden"
                      flex="1"
                      key={field.id}
                    >
                      <Flex justifyContent="space-between">
                        <Button
                          height="20px"
                          width="20px"
                          mt="10px"
                          ml="10px"
                          bg={WHITE_COLOR}
                          fontSize="24px"
                          fontWeight="700"
                          border={`2px solid ${GRAY_TEXT_COLOR}`}
                          color={GRAY_TEXT_COLOR}
                          onClick={() => {
                            remove(index);
                          }}
                          disabled={fields.length <= 2}
                          paddingBottom="4px"
                        >
                          -
                        </Button>
                        <Radio
                          mt="10px"
                          mr="10px"
                          mb="10px"
                          size="lg"
                          width="20px"
                          height="20px"
                          colorScheme="green"
                          type="radio"
                          value={index + ""}
                          border={`2px solid ${GRAY_TEXT_COLOR}`}
                          onChange={(e) => {
                            setCorrectAnswerIndex(Number(e.target.value));
                          }}
                        />
                      </Flex>

                      <Textarea
                        fontWeight="600"
                        whiteSpace="balance"
                        fontSize="20px"
                        bg="white"
                        key={index}
                        border="none"
                        width="100%"
                        h="200px"
                        _active={{
                          border: "none",
                        }}
                        _focus={{
                          outline: "none",
                          borderColor: "none",
                          boxShadow: "none",
                        }}
                        textAlign="center"
                        placeholder={`Answer ${index + 1}`}
                        {...register(`answers.${index}.answerText`)}
                      />
                    </Flex>
                  ))}
                </RadioGroup>
                <Flex flexDir="column" gap="20px" justifyContent="center">
                  <Button
                    bg={WHITE_COLOR}
                    border={`2px solid ${GRAY_TEXT_COLOR}`}
                    fontWeight="600"
                    fontSize="30px"
                    color={GRAY_TEXT_COLOR}
                    onClick={() => {
                      append({ answerText: "", isCorrect: false });
                    }}
                    disabled={fields.length >= 5}
                  >
                    +
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={
                createAnswer.isPending ||
                createQuestion.isPending ||
                updateQuestion.isPending ||
                isLoading
              }
              disabled={
                !(correctAnswerIndex <= fields.length) ||
                errors.answers != undefined
              }
              onMouseOver={() => {
                trigger("questionText");
                if (errors.questionText) {
                  setErrorMessage(errors.questionText.message!);
                  setIsErrorMessageOpen(true);
                } else {
                  trigger("answers");
                  if (errors.answers) {
                    for (let i = 0; i < fields.length; i++) {
                      if (errors.answers[i]) {
                        setErrorMessage(
                          errors.answers[i]!.answerText!.message || ""
                        );
                        setIsErrorMessageOpen(true);
                      }
                    }
                    setIsErrorMessageOpen(true);
                  } else {
                    if (correctAnswerIndex + 1 > fields.length) {
                      setErrorMessage("Choose a correct answer!");
                      setIsErrorMessageOpen(true);
                    }
                  }
                }
              }}
              onMouseLeave={() => {
                setIsErrorMessageOpen(false);
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                onClose();
                setCorrectAnswerIndex(6);
              }}
            >
              Cancel
            </Button>
            <Flex position="relative">
              <ValidateQuestionFormMessage
                message={errorMessage}
                isOpen={isErrorMessageOpen}
              />
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
      <DevTool control={control} />
    </Modal>
  );
}

function ValidateQuestionFormMessage({
  message,
  isOpen,
}: {
  message: string;
  isOpen: boolean;
}) {
  return (
    <Flex
      top="-48px"
      right="200px"
      padding="10px"
      borderRadius="5px"
      minW="160px"
      display={!isOpen ? "none" : ""}
      position="absolute"
      border="2px solid #E64B0B"
      bg={WHITE_COLOR}
      shadow="lg"
    >
      <Text fontWeight="600" color="#E64B0B">
        {message}
      </Text>
    </Flex>
  );
}
