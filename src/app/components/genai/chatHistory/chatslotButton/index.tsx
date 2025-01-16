"use client";

import React, { useState } from "react";
import {
  Flex,
  Text,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ChatslotFromDB } from "@/lib/models/chat/chatslot";
import { TbPencil } from "react-icons/tb";
import { RiDeleteBin2Line } from "react-icons/ri";

import { IoEllipsisHorizontal } from "react-icons/io5";
import Link from "next/link";
import { WHITE_COLOR } from "@/constants/colors";
import Popup from "../../popup";
import { useDeleteChatslot } from "@/services/mutations";
import { usePathname } from "next/navigation";

type ChatslotButtonProps = {
  chat: ChatslotFromDB;
  isCurrentChat: boolean;
  menuState: {
    isOpen: boolean;
    id: number | undefined;
  };
  setMenuState: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number | undefined;
    }>
  >;
};

export const ChatslotButton: React.FC<ChatslotButtonProps> = ({
  chat,
  isCurrentChat,
  menuState,
  setMenuState,
}) => {
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteChatSlot = useDeleteChatslot();
  // const router = useRouter();
  const pathname = usePathname();

  const handleDeleteChatslot = async () => {
    // if(chat.id ==)
    const deleteResponse = await deleteChatSlot.mutateAsync(chat.id);
    console.log(deleteResponse);
    // if()

    // router.push(`/gen-ai`);
    console.log(pathname);
  };

  return (
    <Flex position="relative" width={"100%"}>
      <Link href={`/gen-ai/${chat.id}`} style={{ width: "100%" }}>
        <Flex
          position="relative"
          alignItems="center"
          w="100%"
          borderRadius="10px"
          p="10px"
          onMouseOver={() => setIsIconVisible(true)}
          onMouseLeave={() => {
            setIsIconVisible(false);
          }}
          justifyContent="space-between"
          bg={
            isCurrentChat || (menuState.isOpen && chat.id === menuState.id)
              ? "#E0E0E0"
              : ""
          }
        >
          <Text fontSize="14px">{formatTitle(chat.title)}</Text>

          <Icon
            display={
              isIconVisible || (menuState.isOpen && chat.id === menuState.id)
                ? ""
                : "none"
            }
            as={IoEllipsisHorizontal}
            color="gray"
            _hover={{ color: "black" }}
            onMouseOver={() => setIsPopupVisible(true)}
            onMouseLeave={() => {
              setIsPopupVisible(false);
            }}
            onClick={(e) => {
              e.preventDefault();
              if (!menuState.isOpen) {
                setMenuState({ isOpen: true, id: chat.id });
              } else {
                if (menuState.id === chat.id) {
                  setMenuState({ isOpen: false, id: undefined });
                } else {
                  setMenuState({ isOpen: true, id: chat.id });
                }
              }
            }}
          ></Icon>
          <Popup
            content="Options"
            top={-20}
            left={120}
            isOpen={isPopupVisible}
          />
        </Flex>
      </Link>
      <Flex
        position="absolute"
        left="160px"
        top="30px"
        bg={WHITE_COLOR}
        borderRadius="10px"
        zIndex={1000}
        border="1px solid lightgray"
        p="10px"
        flexDir="column"
        gap="10px"
        fontSize="14px"
        display={menuState.isOpen && chat.id === menuState.id ? "" : "none"}
      >
        <Flex
          borderRadius="10px"
          p="14px"
          _hover={{ bg: "#F9F9F9" }}
          alignItems="center"
          gap="8px"
        >
          <Icon w="14px" h="14px" as={TbPencil} />
          <Text justifySelf="center" mt="3px">
            Rename
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          borderRadius="10px"
          p="14px"
          _hover={{ bg: "#F9F9F9" }}
          gap="8px"
          onClick={onOpen}
        >
          <Icon w="14px" h="14px" as={RiDeleteBin2Line} color="red" />
          <Text justifySelf="center" color="red" mt="3px">
            Delete
          </Text>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white" borderRadius="24px">
          <ModalHeader>Delete Chat?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This will delete {chat.title}.</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              isLoading={deleteChatSlot.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="red"
              bg="red"
              color="white"
              isLoading={deleteChatSlot.isPending}
              onClick={handleDeleteChatslot}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
const formatTitle = (str: string): string => {
  if (str.length > 16) {
    return str.slice(0, 16) + "...";
  }
  return str;
};
