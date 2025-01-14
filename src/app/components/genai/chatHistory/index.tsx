import React, { useState } from "react";
import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import { ChatslotFromDB } from "@/lib/models/chat/chatslot";
import { BiSidebar } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Link from "next/link";

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
        boxShadow="lg"
        zIndex="1000"
        transform={isOpen ? "translateX(0)" : "translateX(-110%)"}
        transition="transform 0.3s ease-in-out"
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
            <Flex
              position="absolute"
              borderRadius="8px"
              bg="black"
              left="45px"
              top="3px"
              width="100px"
              margin="auto auto"
              padding="8px"
              display={isCloseSidebarPopoverVisible ? "" : "none"}
            >
              <Text
                fontSize="12px"
                fontWeight="600"
                color="white"
                textAlign="center"
              >
                Close sidebar
              </Text>
            </Flex>
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

            <Flex
              position="absolute"
              borderRadius="8px"
              bg="black"
              top="45px"
              left="-20px"
              width="80px"
              margin="auto auto"
              padding="8px"
              display={isNewChatPopoverVisible ? "" : "none"}
              justifyContent="center"
            >
              <Text
                fontSize="12px"
                fontWeight="600"
                color="white"
                textAlign="center"
              >
                New chat
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {chats &&
          chats.map((chat) => {
            return (
              <ChatslotButton
                key={chat.id}
                chat={chat}
                isCurrentChat={chat.id === currentChatslotId}
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
            <Flex
              position="absolute"
              borderRadius="8px"
              bg="black"
              top="45px"
              width="100px"
              margin="auto auto"
              padding="8px"
              display={isCloseSidebarPopoverVisible ? "" : "none"}
            >
              <Text
                fontSize="12px"
                fontWeight="600"
                color="white"
                textAlign="center"
              >
                Close sidebar
              </Text>
            </Flex>
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
            <Flex
              position="absolute"
              borderRadius="8px"
              bg="black"
              top="45px"
              left="-20px"
              width="80px"
              margin="auto auto"
              padding="8px"
              display={isNewChatPopoverVisible ? "" : "none"}
              justifyContent="center"
            >
              <Text
                fontSize="12px"
                fontWeight="600"
                color="white"
                textAlign="center"
              >
                New chat
              </Text>
            </Flex>
          </Flex>
        </Flex>{" "}
      </Flex>
    );
  }
}

const ChatslotButton = ({
  chat,
  isCurrentChat,
}: {
  chat: ChatslotFromDB;
  isCurrentChat: boolean;
}) => {
  const [isIconVisible, setIsIconVisible] = useState(false);
  return (
    <Link href={`/gen-ai/${chat.id}`} style={{ width: "100%" }}>
      <Flex
        alignItems="center"
        w="100%"
        borderRadius="10px"
        p="10px"
        onMouseOver={() => setIsIconVisible(true)}
        onMouseLeave={() => {
          setIsIconVisible(false);
        }}
        justifyContent="space-between"
        bg={isCurrentChat ? "#E0E0E0" : ""}
      >
        {/* <Text>{chat.title}</Text> */}
        <Text>{chat.id}</Text>

        <Icon
          display={isIconVisible ? "" : "none"}
          as={IoEllipsisHorizontal}
          color="gray"
          _hover={{ color: "black" }}
        ></Icon>
      </Flex>
    </Link>
  );
};
