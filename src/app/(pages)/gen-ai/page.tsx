"use client";
import { Textarea, Flex, Button, Icon, Text } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
// import ReactMarkdown from "react-markdown";
import "./style.css";
import React, { useRef, useState } from "react";
import { WHITE_COLOR } from "@/constants/colors";
import { Header } from "@/components/header";

import { IoAttachOutline } from "react-icons/io5";
import { useCreateChatslot } from "@/services/mutations";
import { useRouter } from "next/navigation";
import { generateId } from "ai";
import ChatHistory from "@/components/genai/chatHistory";
import { useChatslots } from "@/services/queries";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const GenAI = () => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const chats = useChatslots();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const createChatslot = useCreateChatslot();
  const handleSubmit = async () => {
    const response = await createChatslot.mutateAsync({
      title: inputValue,
      messages: [
        {
          id: generateId(),
          createdAt: new Date(),
          role: "user",
          content: inputValue,
        },
      ],
    });
    console.log(response);
    router.push(`/gen-ai/${response.id}`);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (chats.data)
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
            alignItems="center"
            bg={WHITE_COLOR}
            flex="1"
            p="24px"
            borderRadius={"16px"}
          >
            <ChatHistory
              chats={chats.data || []}
              isOpen={isSidebarOpen}
              toggleSidebarOpen={toggleSidebar}
            />
            <form
              onSubmit={() => {
                handleSubmit();
              }}
              style={{
                width: "60%",
                height: "100%",
              }}
            >
              <Flex width="100%" height="100%" flexDir="column">
                <Flex flex="1" flexDir="column">
                  <Text
                    textAlign="center"
                    mt="300px"
                    mb="30px"
                    fontWeight="700"
                    fontSize="28px"
                  >
                    How can I help you?
                  </Text>
                </Flex>
                <Flex
                  position="sticky"
                  width="100%"
                  bottom="20px"
                  paddingX="40px"
                  mb="300px"
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
                        value={inputValue}
                        resize="vertical"
                        minH="100px"
                        onChange={(e) => {
                          setInputValue(e.target.value);
                        }}
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
                          // disabled={isLoading}
                          // isLoading={isLoading}
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
                          <input
                            type="file"
                            name="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                          />
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
                        bg="black"
                        colorScheme="white"
                        // disabled={isLoading}
                        // isLoading={isLoading}
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
            </form>
          </Flex>
        </Flex>
      </Flex>
    );
};

export default GenAI;
