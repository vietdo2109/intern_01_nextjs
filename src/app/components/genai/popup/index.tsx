import React from "react";
import { Flex, Text } from "@chakra-ui/react";
export default function Popup({
  content,
  top,
  left,
  isOpen,
}: {
  content: string;
  top: number;
  left: number;
  isOpen: boolean;
}) {
  return (
    <Flex
      position="absolute"
      borderRadius="8px"
      bg="black"
      left={`${left}px`}
      top={`${top}px`}
      w="100px"
      margin="auto auto"
      padding="8px"
      display={isOpen ? "" : "none"}
    >
      <Text fontSize="12px" fontWeight="600" color="white" textAlign="center">
        {content}
      </Text>
    </Flex>
  );
}
