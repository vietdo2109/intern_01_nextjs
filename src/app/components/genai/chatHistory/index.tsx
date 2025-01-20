import React, { useState } from "react";
import { Flex, Button, Icon, useDisclosure, Text } from "@chakra-ui/react";
import { ChatslotFromDB } from "@/lib/models/chat/chatslot";
import { BiSidebar } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { ChatslotButton } from "./chatslotButton";
import Popup from "../popup";
import { LuSearch } from "react-icons/lu";
import { SearchChatModal } from "./searchChatModal";

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
  const [isSearchPopoverVisible, setSearchPopoverVisible] = useState(false);
  const [menuState, setMenuState] = useState<{
    isOpen: boolean;
    id: number | undefined;
  }>({ isOpen: false, id: undefined });
  const {
    isOpen: isSearchModalOpen,
    onOpen: onSearchModalOpen,
    onClose: onSearchModalClose,
  } = useDisclosure();

  const dataToSearchModal: Omit<ChatslotFromDB, "userid" | "messages">[] =
    chats.map(({ id, title, lastmodified }) => ({ id, title, lastmodified }));

  const sortedChats = chats.sort((a, b) => {
    const dateA = new Date(a.lastmodified!).getTime();
    const dateB = new Date(b.lastmodified!).getTime();
    return dateB - dateA; // Descending order
  });

  const categorizedChats: Record<string, typeof chats> = {};

  sortedChats.forEach((chat) => {
    const category = getTimeCategory(new Date(chat.lastmodified!));
    if (!categorizedChats[category]) {
      categorizedChats[category] = [];
    }
    categorizedChats[category].push(chat);
  });

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
        borderRadius={"16px"}
        zIndex="1000"
        style={{
          transform: `${isOpen ? "translateX(0)" : "translateX(-110%)"}`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Flex w="100%" justifyContent="space-between" p="12px">
          {/* sidebar button */}

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

            {/* sidebar button */}
          </Flex>

          <Flex gap="8px">
            {/* search button */}
            <Flex position="relative">
              <Button
                alignSelf="end"
                zIndex="1000"
                // disabled={isLoading}
                // isLoading={isLoading}
                _hover={{
                  bg: `lightgray`,
                }}
                onMouseOver={() => setSearchPopoverVisible(true)}
                onMouseLeave={() => {
                  setSearchPopoverVisible(false);
                }}
                onClick={onSearchModalOpen}
                bg="none"
                w="40px"
                h="40px"
                p="3px"
                borderRadius="6px"
              >
                <Icon color="#5D5D5D" w="24px" h="24px" as={LuSearch} />
              </Button>
              <Popup
                content="Search chats"
                top={45}
                left={-30}
                isOpen={isSearchPopoverVisible}
              />
            </Flex>
            {/* search button */}

            {/* search modal */}
            <SearchChatModal
              data={dataToSearchModal}
              onClose={onSearchModalClose}
              isOpen={isSearchModalOpen}
            />
            {/* search modal */}

            {/* new chat button */}
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
            {/* new chat button */}
          </Flex>
        </Flex>
        <Flex flexDir="column" width="100%" overflowY="auto" p="12px">
          {Object.entries(categorizedChats).map(([category, chats]) => (
            <Flex key={category} flexDir="column" w="96%" mt="20px">
              <Flex key={category} flexDir="column">
                <Text fontSize="12px" fontWeight={600} mb="6px">
                  {category}
                </Text>
                <ul>
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
                </ul>
              </Flex>
            </Flex>
          ))}
        </Flex>
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

const getTimeCategory = (date: Date): string => {
  const now = new Date();
  const chatDate = new Date(date);

  const diffInMs = now.getTime() - chatDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays <= 7) return "Previous 7 Days";
  if (diffInDays <= 30) return "Previous 30 Days";

  return "Older";
};
