import React, { useState } from "react";
import { Flex, Button, Icon } from "@chakra-ui/react";
import { ChatslotFromDB } from "@/lib/models/chat/chatslot";
import { BiSidebar } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { ChatslotButton } from "./chatslotButton";
import Popup from "../popup";

export default function ChatHistory({
  chats,
  currentChatslotId,
  isOpen,
  toggleSidebarOpen,
}: {
  chats: ChatslotFromDB[];
  currentChatslotId?: number;
  isOpen: boolean;
  toggleSidebarOpen: () => void;
}) {
  const [isNewChatPopoverVisible, setIsNewChatPopoverVisible] = useState(false);
  const [isCloseSidebarPopoverVisible, setCloseSidebarPopoverVisible] =
    useState(false);
  const [menuState, setMenuState] = useState<{
    isOpen: boolean;
    id: number | undefined;
  }>({ isOpen: false, id: undefined });

  if (isOpen) {
    return (
      <Flex
        position="sticky"
        top="48px"
        left="24px"
        flexDir="column"
        alignItems="center"
        bg={"#F9F9F9"}
        width="16%"
        minWidth="200px"
        alignSelf="flex-start"
        height="80vh"
        p="12px"
        borderRadius={"16px"}
        zIndex="1000"
        style={{
          transform: `${isOpen ? "translateX(0)" : "translateX(-110%)"}`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Flex w="100%" justifyContent="space-between" mb="24px">
          <Flex position="relative">
            <Button
              alignSelf="end"
              zIndex="1000"
              type="submit"
              // disabled={isLoading}
              // isLoading={isLoading}
              _hover={{
                bg: `lightgray`,
              }}
              onMouseOver={() => setCloseSidebarPopoverVisible(true)}
              onMouseLeave={() => {
                setCloseSidebarPopoverVisible(false);
              }}
              onClick={() => {
                toggleSidebarOpen();
                console.log(isOpen);
              }}
              bg="none"
              w="40px"
              h="40px"
              p="3px"
              borderRadius="6px"
            >
              <Icon color="#5D5D5D" w="24px" h="24px" as={BiSidebar} />
            </Button>

            <Popup
              content="Close sidebar"
              top={3}
              left={45}
              isOpen={isCloseSidebarPopoverVisible}
            />
          </Flex>

          <Flex position="relative">
            <Link href="/gen-ai">
              <Button
                alignSelf="end"
                zIndex="1000"
                type="submit"
                // disabled={isLoading}
                // isLoading={isLoading}
                _hover={{
                  bg: `lightgray`,
                }}
                onMouseOver={() => setIsNewChatPopoverVisible(true)}
                onMouseLeave={() => {
                  setIsNewChatPopoverVisible(false);
                }}
                bg="none"
                w="40px"
                h="40px"
                p="3px"
                borderRadius="6px"
              >
                <Icon color="#5D5D5D" w="24px" h="24px" as={BiEdit} />
              </Button>
            </Link>

            <Popup
              content="New chat"
              top={45}
              left={-30}
              isOpen={isNewChatPopoverVisible}
            />
          </Flex>
        </Flex>

        {chats &&
          chats.map((chat) => {
            return (
              <ChatslotButton
                key={chat.id}
                chat={chat}
                isCurrentChat={chat.id === currentChatslotId}
                menuState={menuState}
                setMenuState={setMenuState}
              />
            );
          })}
      </Flex>
    );
  } else {
    return (
      <Flex
        position="sticky"
        top="10px"
        left="24px"
        flexDir="column"
        width="16%"
        minWidth="200px"
        alignSelf="flex-start"
      >
        <Flex gap="24px">
          <Flex position="relative">
            <Button
              alignSelf="end"
              zIndex="1000"
              type="submit"
              // disabled={isLoading}
              // isLoading={isLoading}
              _hover={{
                bg: `lightgray`,
              }}
              onMouseOver={() => setCloseSidebarPopoverVisible(true)}
              onMouseLeave={() => {
                setCloseSidebarPopoverVisible(false);
              }}
              onClick={() => {
                toggleSidebarOpen();
                console.log(isOpen);
              }}
              bg="none"
              w="40px"
              h="40px"
              p="3px"
              borderRadius="6px"
            >
              <Icon color="#5D5D5D" w="24px" h="24px" as={BiSidebar} />
            </Button>

            <Popup
              content="Close sidebar"
              top={45}
              left={0}
              isOpen={isCloseSidebarPopoverVisible}
            />
          </Flex>

          <Flex position="relative">
            <Link href="/gen-ai">
              <Button
                alignSelf="end"
                zIndex="1000"
                type="submit"
                // disabled={isLoading}
                // isLoading={isLoading}
                _hover={{
                  bg: `lightgray`,
                }}
                onMouseOver={() => setIsNewChatPopoverVisible(true)}
                onMouseLeave={() => {
                  setIsNewChatPopoverVisible(false);
                }}
                bg="none"
                w="40px"
                h="40px"
                p="3px"
                borderRadius="6px"
              >
                <Icon color="#5D5D5D" w="24px" h="24px" as={BiEdit} />
              </Button>
            </Link>
            <Popup
              content="New chat"
              top={45}
              left={-30}
              isOpen={isNewChatPopoverVisible}
            />
          </Flex>
        </Flex>{" "}
      </Flex>
    );
  }
}
