"use client";

import React, { useEffect, useRef, useState } from "react";
import { Textarea, Flex, Button, Icon, Text, Box } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import "./style.css";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { IoAttachOutline } from "react-icons/io5";
import { useEditChatslot } from "@/services/mutations";
import { ChatslotFromDB, Mess } from "@/lib/models/chat/chatslot";
import { generateId } from "ai";

export default function FormChat({
  initialInput,
  data,
}: {
  initialInput?: string;
  data: ChatslotFromDB;
}) {
  const dataCopy = data;
  const editChatSlot = useEditChatslot();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      // handle error:
      onError: (error) => {
        console.error(error);
      },
      onFinish: async (result) => {
        if (data.messages.length === 1) {
          const updatedMessages = [data.messages[0], result];
          const editResponse = await editChatSlot.mutateAsync({
            title: data.title,
            id: data.id,
            messages: updatedMessages,
          });
          console.log(editResponse.data);
        } else {
          // const newMessages: ChatslotFromDB = [{}];
          const userInput: Mess = {
            id: generateId(),
            createdAt: new Date(),
            role: "user",
            content: input,
          };
          const updatedMessages = [...data.messages, userInput, result];
          const editResponse = await editChatSlot.mutateAsync({
            title: data.title,
            id: data.id,
            messages: updatedMessages,
          });
          console.log(editResponse.data);
        }
      },
      initialInput: initialInput || "",
    });

  const [visible, setVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // handle automatically scroll after new text generated
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (data.messages.length === 1) {
      handleSubmit(event, {
        allowEmptySubmit: false,
      });
    }
  }, [initialInput]);

  return (
    <Flex w="60%" align="center" justify="center">
      <form
        onSubmit={() => {
          handleSubmit();
        }}
        style={{
          width: "100%",
          height: "100%",
          justifySelf: "center",
          alignSelf: "center",
        }}
      >
        <Flex width="100%" height="100%" flexDir="column">
          <Flex flex="1" flexDir="column">
            {dataCopy.messages.length >= 2 &&
              data.messages?.map((m: Mess) => {
                return (
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
                            minW="32px"
                            h="32px"
                            borderRadius="50%"
                            bg="gray"
                            overflow="hidden"
                            backgroundSize="cover"
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
                );
              })}
            {messages.map((m) => {
              return (
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
                          minW="32px"
                          h="32px"
                          borderRadius="50%"
                          bg="gray"
                          overflow="hidden"
                          backgroundSize="cover"
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
                  <div ref={messagesEndRef} />
                </Flex>
              );
            })}
          </Flex>
          <Flex
            position="sticky"
            width="100%"
            bottom="48px"
            paddingX="40px"
            justifySelf="flex-end"
          >
            <Flex position="relative" width="100%">
              <Flex flexDir="column" w="100%">
                <Textarea
                  size="lg"
                  rows={3}
                  shadow="md"
                  borderTopLeftRadius="16px"
                  borderBottomLeftRadius="0px"
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
                      handleSubmit(); // Submit the form
                    }
                  }}
                />
                <Flex
                  w="100%"
                  bg={"#F4F4F4"}
                  p="10px"
                  borderBottomLeftRadius="16px"
                >
                  <Button
                    alignSelf="end"
                    zIndex="1000"
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    _hover={{
                      bg: `lightgray`,
                    }}
                    onMouseOver={() => setVisible(true)}
                    onMouseLeave={() => {
                      setVisible(false);
                    }}
                    bg="none"
                    w="40px"
                    h="40px"
                    p="3px"
                    borderRadius="6px"
                    onClick={handleUploadButtonClick}
                  >
                    {/* <input
                      type="file"
                      name="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    /> */}
                    <Icon
                      color="Black"
                      w="30px"
                      h="30px"
                      as={IoAttachOutline}
                    />
                  </Button>
                  <Text
                    alignSelf="center"
                    ml="16px"
                    display={visible ? "" : "none"}
                  >
                    {"Uploading file isn't ready yet!"}
                  </Text>
                </Flex>
              </Flex>

              <Flex h="100%" bg={"#F4F4F4"} p="10px" borderRightRadius="16px">
                <Button
                  alignSelf="end"
                  zIndex="1000"
                  type="submit"
                  bg="black"
                  colorScheme="white"
                  disabled={isLoading || input === ""}
                  isLoading={isLoading}
                  w="40px"
                  h="40px"
                  p="3px"
                  borderRadius="20px"
                  color="white"
                  _hover={{ color: "gray" }}
                >
                  <Icon as={FaArrowUp} />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </form>{" "}
    </Flex>
  );
}
