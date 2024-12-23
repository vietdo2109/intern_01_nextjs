import { createContext } from "react";
export const QuestionsContext = createContext<QuestionInContext[] | undefined>(
  undefined
);
export const QuestionsDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

export type QuestionInContext = {
  id: number;
  questionText: string;
  answers: {
    id: number;
    answerText: string;
    isCorrect: boolean;
  }[];
};

export type Action =
  | { type: "added"; payload: QuestionInContext }
  | { type: "deleted"; payload: { id: number } }
  | { type: "changed"; payload: QuestionInContext }
  | { type: "replaceAnswers"; payload: QuestionInContext };
