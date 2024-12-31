"use client";
import { Textarea, Flex, Button, Icon, Text, Box } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
// import ReactMarkdown from "react-markdown";
import "./style.css";
import React, { useEffect } from "react";
import { Montserrat } from "next/font/google";
import { GREEN_COLOR, WHITE_COLOR } from "@/constants/colors";
import { Header } from "@/components/header";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";

const montserrat = Montserrat({ subsets: ["latin"] });
const GenAI = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  useEffect(() => {
    console.log(messages);
  }, [messages]);
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
            onSubmit={handleSubmit}
            style={{
              width: "60%",
              height: "100%",
            }}
          >
            <Flex width="100%" height="100%" flexDir="column">
              <Flex flex="1" flexDir="column">
                {messages.length === 0 && (
                  <Text
                    textAlign="center"
                    mt="300px"
                    fontWeight="700"
                    fontSize="28px"
                  >
                    How can I help you?
                  </Text>
                )}
                {messages.map((m) => (
                  <Flex
                    key={m.id}
                    flexDir="column"
                    width="100%"
                    gap="24px"
                    mb="24px"
                  >
                    {m.role === "user" && (
                      <Flex w="100%" justifyContent="flex-end">
                        <Flex
                          maxW="60%"
                          bg="#F3F3F3"
                          borderRadius="14px"
                          padding="16px"
                          wordBreak="break-word" // Break long words if needed
                          whiteSpace="pre-wrap"
                        >
                          {m.content}
                        </Flex>
                      </Flex>
                    )}
                    {m.role !== "user" && (
                      <Flex w="100%">
                        <Flex w="100%" gap="24px" padding="16px">
                          <Box
                            w="32px"
                            h="32px"
                            borderRadius="50%"
                            bg="gray"
                            overflow="hidden"
                          >
                            <img
                              src="https://bitcoinist.com/wp-content/uploads/2023/11/Shiba-Inu-by-Tradingview.png"
                              alt="shiba avatar"
                            />
                          </Box>
                          <Flex
                            flexDir="column"
                            w="90%"
                            mt="5px"
                            gap="16px"
                            wordBreak="break-word" // Break long words if needed
                          >
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                          </Flex>
                        </Flex>{" "}
                      </Flex>
                    )}
                  </Flex>
                ))}
              </Flex>
              <Flex
                position="sticky"
                width="100%"
                bottom="20px"
                paddingX="40px"
                mb={messages.length === 0 ? "300px" : ""}
              >
                <Flex position="relative" width="100%">
                  <Textarea
                    size="lg"
                    rows={3}
                    shadow="md"
                    borderTopLeftRadius="16px"
                    borderBottomLeftRadius="16px"
                    borderRightRadius="0px"
                    border="none"
                    bg={"#F4F4F4"}
                    p="16px"
                    boxShadow="0 0 0 rgb(255, 255, 255)"
                    _focus={{
                      outline: "none",
                      outlineWidth: "0",
                      boxShadow: "0 0 0 rgb(255, 255, 255)",
                    }}
                    _active={{ outline: "none", outlineWidth: "0" }}
                    placeholder="Chat message"
                    value={input}
                    resize="vertical"
                    minH="100px"
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // Prevent the default line break
                        handleSubmit(e); // Submit the form
                      }
                    }}
                  />
                  <Flex
                    h="100%"
                    bg={"#F4F4F4"}
                    p="10px"
                    borderRightRadius="16px"
                  >
                    <Button
                      alignSelf="end"
                      zIndex="1000"
                      type="submit"
                      bg={GREEN_COLOR}
                      colorScheme="green"
                      disabled={isLoading}
                      isLoading={isLoading}
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
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GenAI;
