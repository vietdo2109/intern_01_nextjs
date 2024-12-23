import {
  Action,
  QuestionInContext,
  QuestionsContext,
  QuestionsDispatchContext,
} from "./QuizContext";
import { useContext } from "react";
const useQuestionsState = (): QuestionInContext[] => {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error("useQuestionsState must be used within a CounterProvider");
  }
  return context;
};

const useQuestionsDispatch = (): React.Dispatch<Action> => {
  const context = useContext(QuestionsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionsDispatch must be used within a QuestionProvider"
    );
  }
  return context;
};
