"use client";

import { useChatslot, useChatslots } from "@/services/queries";
import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import "../style.css";
import { Montserrat } from "next/font/google";
import { WHITE_COLOR } from "@/constants/colors";
import { Header } from "@/components/header";

import FormChat from "@/components/genai/formChat";
import ChatHistory from "@/components/genai/chatHistory";
import LoadingSpinner from "@/components/skeletons/loadingSpinner";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Chat({ params }: { params: { id: number } }) {
  const { data } = useChatslot(params.id);
  const chats = useChatslots();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log(chats.data);
  }, [chats]);
  if (data !== undefined && chats) {
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
            gap="48px"
            borderRadius={"16px"}
            position="relative"
          >
            <ChatHistory
              currentChatslotId={data.id}
              chats={chats.data || []}
              isOpen={isSidebarOpen}
              toggleSidebarOpen={toggleSidebar}
            />
            <FormChat
              initialInput={
                data.messages.length === 1 ? data?.messages[0].content : ""
              }
              data={data}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex width="100%" minW="700px" flexDir="column">
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
            <LoadingSpinner />
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
