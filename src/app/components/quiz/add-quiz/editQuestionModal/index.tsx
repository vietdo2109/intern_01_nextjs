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
import { useEffect, useState } from "react";
const montserrat = Montserrat({ subsets: ["latin"] });
import { useForm, useFieldArray } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateAnswer,
  useDeleteAnswer,
  useEditAnswer,
  useEditQuestion,
} from "@/services/mutations";
import { QuestionFromDB } from "@/lib/models/quiz/quesion";
import { QuizFromDB } from "@/lib/models/quiz/quiz";
import { questionSchema, QuestionData } from "../../addQuestionModal";
import { useContext } from "react";
import {
  QuestionInContext,
  QuestionsContext,
  QuestionsDispatchContext,
} from "@/(pages)/quiz/quizContext/QuizContext";
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
  const questionContext = useContext(QuestionsContext);
  const questionToEdit = questionContext?.find((q) => q.id === question.id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isLoading },
    trigger,
  } = useForm<QuestionData>({
    defaultValues: questionToEdit,
    resolver: yupResolver(questionSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers", // unique name for your Field Array,
    rules: { minLength: 2, maxLength: 5 },
  });

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
    questionToEdit?.answers.findIndex((answer) => answer.isCorrect === true) ||
      0
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);
  const createAnswer = useCreateAnswer();
  const deleteAnswer = useDeleteAnswer();
  const editAnswer = useEditAnswer();
  const editQuestion = useEditQuestion();
  const dispatch = useContext(QuestionsDispatchContext);

  useEffect(() => {
    if (questionToEdit) {
      reset(questionToEdit); // Update the form values when questionToEdit changes

      setCorrectAnswerIndex(
        questionToEdit?.answers.findIndex((answer) => answer.isCorrect)
      );
    }
  }, [questionToEdit, reset]);

  const onSubmit = async (data: QuestionData) => {
    if (correctAnswerIndex + 1 <= fields.length && questionToEdit) {
      try {
        // Mark the correct answer
        try {
          const prevCorrectAnswerIndex = data.answers.findIndex(
            (answer) => answer.isCorrect
          );
          if (data.answers[prevCorrectAnswerIndex]) {
            data.answers[prevCorrectAnswerIndex].isCorrect = false;
          }
          data.answers[correctAnswerIndex].isCorrect = true;

          handleQuestionUpdate(data, questionToEdit);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.error("Error creating question and answers:", error);
      }
    } else {
      console.log("no correct answer chosen!");
    }
  };
  const handleQuestionUpdate = async (
    newData: QuestionData,
    oldData: QuestionInContext
  ) => {
    // Step 1: get new answer data from newData
    const newAnswers = newData.answers.filter(
      (answer) => !answer.hasOwnProperty("id")
    );

    // Step 2: get deleted answers data
    const deletedAnswers = oldData.answers.filter(
      (oldAnswer) =>
        !newData.answers.some((newAnswer) => newAnswer.id === oldAnswer.id)
    );
    console.log("deletedAnswers", deletedAnswers);

    // Step 3: create all new answer on DB, take the newAnswerIds back
    const createNewAnswersResponse = await Promise.all(
      newAnswers.map(async (newAnswer) => {
        const response = await createAnswer.mutateAsync({
          questionid: oldData.id, // Pass the question ID for the foreign key
          answertext: newAnswer.answerText,
          iscorrect: newAnswer.isCorrect,
        });
        return {
          id: response.id,
          answerText: newAnswer.answerText,
          isCorrect: newAnswer.isCorrect,
        }; // Return the answer ID
      })
    );

    // Step 4: get remainingAnswerIds (old answer ids not being deleted)
    const remainingAnswers = oldData.answers.filter((oldAnswer) =>
      newData.answers.some((newAnswer) => newAnswer.id === oldAnswer.id)
    );

    const remainingAnswerIds = remainingAnswers.map((ans) => ans.id);

    // Step 5: delete asnwers
    await Promise.all(
      deletedAnswers.map(async (answer) => {
        const response = await deleteAnswer.mutateAsync(answer.id);
        return response; // Return the answer ID
      })
    );

    // Step 6: edit remaining answers?
    // 6.1: get edited answers data
    const editedAnswers = newData.answers.filter((newAns) =>
      remainingAnswerIds.includes(newAns.id!)
    );
    const editedAnswersResponse = await Promise.all(
      editedAnswers.map(async (answer) => {
        await editAnswer.mutateAsync({
          id: answer.id!,
          questionid: oldData.id,
          answertext: answer.answerText,
          iscorrect: answer.isCorrect,
        });
        return {
          id: answer.id!,
          answerText: answer.answerText,
          isCorrect: answer.isCorrect,
        }; // Return the answer ID
      })
    );

    // Step 7: get finalAnswerIds
    const createNewAnswerIds = createNewAnswersResponse.map((ans) => ans.id);
    const finalAnswerIds = [...remainingAnswerIds, ...createNewAnswerIds];

    // Step 8*: edit question on db with new questionText? and finalAnswerIds
    const updatedQuestion = {
      id: oldData.id,
      quizid: quiz.id, // Pass the quiz ID for the foreign key
      questiontext: newData.questionText,
      answerids: finalAnswerIds,
    };
    await editQuestion.mutateAsync({
      ...updatedQuestion,
    });
    console.log("dispatch data: changed", {
      id: oldData.id,
      questionText: newData.questionText,
      answers: [...editedAnswersResponse, ...createNewAnswersResponse],
    });
    // Step 9: update questionContext
    if (dispatch) {
      try {
        dispatch({
          type: "replaceAnswers",
          payload: {
            id: oldData.id,
            questionText: newData.questionText,
            answers: [...editedAnswersResponse, ...createNewAnswersResponse],
          },
        });
      } catch (error) {
        console.log("error dispatching", error);
      }
    } else {
      alert("cannot dispatch now");
    }

    reset();
    onClose();
  };

  if (questionToEdit) {
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
                    value={correctAnswerIndex + ""}
                  >
                    {fields.map((field, index) => {
                      return (
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
                                if (index < correctAnswerIndex) {
                                  setCorrectAnswerIndex((prev) => prev - 1);
                                } else if (index === correctAnswerIndex) {
                                  setCorrectAnswerIndex(6);
                                }
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
                      );
                    })}
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
                  deleteAnswer.isPending ||
                  editAnswer.isPending ||
                  editQuestion.isPending ||
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
                  setCorrectAnswerIndex(
                    questionToEdit?.answers.findIndex(
                      (answer) => answer.isCorrect
                    )
                  );
                  reset(questionToEdit); // Update the form values when questionToEdit changes
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
        {/* <DevTool control={control} /> */}
      </Modal>
    );
  }
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
