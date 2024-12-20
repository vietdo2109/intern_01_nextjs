import { Text } from "@chakra-ui/react";

export default function ErrorMess({
  error,
}: {
  error: string[] | undefined | string;
}) {
  return (
    <Text
      mt={"5px"}
      ml={"5px"}
      color={"red"}
      fontSize={"12px"}
      fontWeight={"400"}
      maxW={"350px"}
    >
      {error}
    </Text>
  );
}
