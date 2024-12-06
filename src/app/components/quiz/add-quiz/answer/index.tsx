import React from "react";
import { Text } from "@chakra-ui/react";
import { useAnswer } from "@/components/services/queries";
import { GREEN_COLOR, RED_COLOR } from "@/constants/colors";
export default function Answer({ answerId }: { answerId: number }) {
  const answer = useAnswer(answerId);
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
