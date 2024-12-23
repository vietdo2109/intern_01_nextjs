"use client";
import {
  Action,
  QuestionInContext,
  QuestionsContext,
  QuestionsDispatchContext,
} from "./quizContext/QuizContext";
import { useReducer } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [questions, dispatch] = useReducer(questionsReducer, initialQuestions);

  return (
    <QueryClientProvider client={queryClient}>
      <QuestionsContext.Provider value={questions}>
        <QuestionsDispatchContext.Provider value={dispatch}>
          {children}{" "}
        </QuestionsDispatchContext.Provider>
      </QuestionsContext.Provider>
    </QueryClientProvider>
  );
}

function questionsReducer(questions: QuestionInContext[], action: Action) {
  switch (action.type) {
    case "added": {
      if (action.payload.id >= 0) {
        // Check if the id already exists in the questions array
        const exists = questions.some(
          (question) => question.id === action.payload.id
        );
        if (!exists) {
          return [...questions, action.payload];
        }
      }
      return questions; // Return the original array if the id already exists or condition fails
    }
    case "changed":
      return questions.map((question) =>
        question.id === action.payload.id
          ? {
              ...question,
              answers: [
                ...question.answers.filter(
                  (answer) =>
                    !action.payload.answers.find((a) => a.id === answer.id)
                ),
                ...action.payload.answers,
              ],
            }
          : question
      );

    case "replaceAnswers":
      return questions.map((question) =>
        question.id === action.payload.id
          ? {
              ...question,
              answers: action.payload.answers,
            }
          : question
      );

    case "deleted": {
      return questions.filter((q) => q.id !== action.payload.id);
    }

    default: {
      throw Error("Unknown action");
    }
  }
}

const initialQuestions: QuestionInContext[] = [];
