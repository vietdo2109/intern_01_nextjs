"use client";
import {
  Textarea,
  Flex,
  Button,
  Icon,
  border,
  Text,
  Heading,
  Box,
  UnorderedList,
  OrderedList,
  ListItem,
  Code,
} from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

import { useCreateAIChat } from "@/components/services/mutations";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { GREEN_COLOR, WHITE_COLOR } from "@/constants/colors";
import { useForm } from "react-hook-form";
import { Header } from "@/components/header";

const montserrat = Montserrat({ subsets: ["latin"] });
type Chat = { prompt: string; response: string };
const GenAI = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<Chat[]>([]);
  const createAIChat = useCreateAIChat();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<{ prompt: string }>();

  const onSubmit = async (data: { prompt: string }) => {
    setLoading(true);
    setResponse("");
    const tempChat = { prompt: data.prompt, response: "" };
    const chatResponse = await createAIChat.mutateAsync({
      prompt: data.prompt,
    });
    tempChat.response = chatResponse.result;
    setChat((prev) => [...prev, tempChat]);
    setResponse(chatResponse.result);
    setLoading(false);
    reset();
  };

  return (
    <Flex
      width="100%"
      minW="700px"
      zIndex={1}
      right={0}
      flexDir="column"
      className={montserrat.className}
    >
      <Flex
        flex="1"
        width="100%"
        padding="24px"
        gap={"24px"}
        flexDir={"column"}
        minH={"100vh"}
      >
        <Flex>
          <Header theme="dark" page="Chat Bot" />
        </Flex>

        <Flex
          flexDir="column"
          alignItems="center"
          bg={WHITE_COLOR}
          flex="1"
          p="24px"
          borderRadius={"16px"}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "60%",
              height: "100%",
            }}
          >
            <Flex width="100%" height="100%" flexDir="column">
              <Flex flex="1" flexDir="column">
                {chat.map((qa) => (
                  <Flex flexDir="column" width="100%" gap="24px" mb="24px">
                    <Flex w="100%" justifyContent="flex-end">
                      <Flex
                        maxW="60%"
                        bg="#F3F3F3"
                        borderRadius="14px"
                        padding="16px"
                        wordBreak="break-word" // Break long words if needed
                        whiteSpace="pre-wrap"
                      >
                        {qa.prompt}
                      </Flex>
                    </Flex>
                    <Flex w="100%">
                      <Flex maxW="100%" borderRadius="14px" padding="16px">
                        <Response response={qa.response} />
                      </Flex>{" "}
                    </Flex>
                  </Flex>
                ))}
              </Flex>
              <Flex position="sticky" width="100%" bottom="20px">
                <Flex position="relative" width="100%">
                  <Textarea
                    size="lg"
                    rows={3}
                    shadow="md"
                    borderRadius="16px"
                    bg={"#F4F4F4"}
                    border="none"
                    p="16px"
                    _focus={{ boxShadow: "0 0 0 rgb(255, 255, 255)" }}
                    _active={{ outline: "none", outlineWidth: "0" }}
                    placeholder="Chat message"
                    {...register("prompt")}
                    resize="none"
                  ></Textarea>
                  <Button
                    position="absolute"
                    right="10px"
                    bottom="10px"
                    zIndex="1000"
                    margin="auto 0px"
                    type="submit"
                    bg={GREEN_COLOR}
                    colorScheme="green"
                    disabled={loading}
                    isLoading={loading ? true : false}
                    w="40px"
                    h="40px"
                    p="3px"
                    borderRadius="20px"
                  >
                    <Icon color="white" as={FaArrowUp} />
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GenAI;
type Section =
  | { type: "heading"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "code"; content: string };

const Response = ({ response }: { response: string }) => {
  const parseGeneralResponse = (res: string): Section[] => {
    const lines = res.split("\n");
    const parsed: Section[] = [];

    let currentSection: Section | null = null;

    lines.forEach((line) => {
      if (line.startsWith("#")) {
        parsed.push({
          type: "heading",
          content: line.replace(/^#+\s*/, "").trim(),
        });
      } else if (line.startsWith("- ")) {
        if (!currentSection || currentSection.type !== "list") {
          currentSection = { type: "list", items: [] };
          parsed.push(currentSection);
        }
        currentSection.items.push(line.replace(/^- /, "").trim());
      } else if (/^\d+\./.test(line)) {
        if (!currentSection || currentSection.type !== "ordered-list") {
          currentSection = { type: "ordered-list", items: [] };
          parsed.push(currentSection);
        }
        currentSection.items.push(line.replace(/^\d+\.\s*/, "").trim());
      } else if (line.startsWith("```")) {
        if (currentSection && currentSection.type === "code") {
          currentSection = null; // End of code block
        } else {
          currentSection = { type: "code", content: "" };
          parsed.push(currentSection);
        }
      } else if (currentSection && currentSection.type === "code") {
        currentSection.content += `${line}\n`;
      } else if (line.trim()) {
        parsed.push({ type: "paragraph", content: line.trim() });
      }
    });

    return parsed;
  };
  const parsedResponse = parseGeneralResponse(response);

  return (
    <Box>
      {parsedResponse.map((section, index) => {
        switch (section.type) {
          case "heading":
            return (
              <Heading as="h2" size="lg" key={index} mt={4} mb={2}>
                {section.content}
              </Heading>
            );
          case "paragraph":
            return (
              <Text key={index} mb={2}>
                {section.content}
              </Text>
            );
          case "list":
            return (
              <UnorderedList key={index} mb={2}>
                {section.items.map((item, i) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </UnorderedList>
            );
          case "ordered-list":
            return (
              <OrderedList key={index} mb={2}>
                {section.items.map((item, i) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </OrderedList>
            );
          case "code":
            return (
              <Code
                key={index}
                display="block"
                whiteSpace="pre-wrap"
                p={2}
                bg="gray.100"
                borderRadius="md"
                mb={2}
              >
                {section.content}
              </Code>
            );
          default:
            return null;
        }
      })}
    </Box>
  );
};
