import React, { useContext, useEffect } from "react";
import { Text } from "@chakra-ui/react";

import { useAnswer } from "@/components/services/queries";
import { GREEN_COLOR, RED_COLOR } from "@/constants/colors";
import {
  QuestionsContext,
  QuestionsDispatchContext,
} from "@/(pages)/quiz/quizContext/QuizContext";
export default function Answer({ answerId }: { answerId: number }) {
  const answer = useAnswer(answerId);
  const dispatch = useContext(QuestionsDispatchContext);
  const questions = useContext(QuestionsContext);

  useEffect(() => {
    if (answer.data && questions) {
      // Dispatch only when `question.data` is available
      const modifiedQuestion = questions.find(
        (question) => question.id === answer.data.questionid
      );

      if (modifiedQuestion && dispatch) {
        const updatedAnswers = [...modifiedQuestion.answers];
        if (
          !updatedAnswers.some(
            (existingAnswer) => existingAnswer.id === answer.data.id
          )
        ) {
          updatedAnswers.push({
            id: answer.data.id,
            answerText: answer.data.answertext,
            isCorrect: answer.data.iscorrect,
          });
        }
        console.log("updatedAnswers: ", updatedAnswers);
        try {
          dispatch({
            type: "changed",
            payload: {
              ...modifiedQuestion,
              answers: updatedAnswers,
            },
          });
          console.log("updatedQuestions", questions);
        } catch (error) {
          console.log("error dispatching", error);
        }
      }
    }
  }, [answer.data, dispatch]); // Dependency array ensures this runs only when `question.data` changes

  if (answer.data) {
    return (
      <Text
        key={answerId}
        color={answer.data.iscorrect ? GREEN_COLOR : RED_COLOR}
      >
        {answer.data.answertext}
      </Text>
    );
  }
}
