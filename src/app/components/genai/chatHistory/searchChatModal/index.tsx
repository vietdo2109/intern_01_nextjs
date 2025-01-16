import React, { FC, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Flex,
  ModalHeader,
  ModalCloseButton,
  Text,
  Switch,
  extendTheme,
  ChakraProvider,
  Input,
  Icon,
  ModalFooter,
} from "@chakra-ui/react";
import { WHITE_COLOR } from "@/constants/colors";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { ChatslotFromDB } from "@/lib/models/chat/chatslot";
import { RiWechatLine } from "react-icons/ri";

const montserrat = Montserrat({ subsets: ["latin"] });
type SearchChatModalProps = {
  onClose: () => void;
  isOpen: boolean;
  data: Omit<ChatslotFromDB, "userid" | "messages">[];
};

export const SearchChatModal: FC<SearchChatModalProps> = ({
  onClose,
  isOpen,
  data,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<
    Omit<ChatslotFromDB, "userid" | "messages">[]
  >([]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = data.filter((item) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredResults(results);
    }
  };

  return (
    <Modal
      scrollBehavior="inside"
      onClose={onClose}
      size="3xl"
      isOpen={isOpen}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalContent
        className={montserrat.className}
        shadow="2xl"
        bg={WHITE_COLOR}
        borderRadius="16px"
        border="1px solid lightgray"
        borderBottom="none"
      >
        <ModalHeader>
          <Flex alignItems="center" justifyContent="space-between">
            <Input
              w="80%"
              border="none"
              _focus={{
                outline: "none",
                outlineWidth: "0",
                boxShadow: "0 0 0 rgb(255, 255, 255)",
              }}
              placeholder="Search chats..."
              _active={{ outline: "none", outlineWidth: "0" }}
              value={searchTerm}
              onChange={handleSearch}
            ></Input>

            <ModalCloseButton color="gray" />
          </Flex>
        </ModalHeader>
        <Flex h="1px" bg="lightgray" w="100%"></Flex>

        <ModalBody p="10px">
          <Flex flexDir="column" h="400px" w="100%" gap="8px">
            <Link href="/gen-ai">
              <Flex
                _hover={{
                  bg: `#f1f1f1`,
                }}
                w="100%"
                borderRadius="6px"
                padding={"10px 14px"}
                alignItems="center"
                gap="10px"
              >
                <Icon color="#5D5D5D" w="22px" h="22px" as={BiEdit} />
                <Text mt={"2px"} fontSize="14px">
                  New chat
                </Text>
              </Flex>
              <Flex h="1px" bg="lightgray" w="100%" mt="8px"></Flex>
            </Link>
            {filteredResults.length === 0
              ? data.map((chat) => (
                  <Link href={`/gen-ai/${chat.id}`}>
                    <Flex
                      _hover={{
                        bg: `#f1f1f1`,
                      }}
                      w="100%"
                      borderRadius="6px"
                      padding={"10px 14px"}
                      alignItems="center"
                      gap="10px"
                    >
                      <Icon
                        color="#5D5D5D"
                        w="22px"
                        h="22px"
                        as={RiWechatLine}
                      />
                      <Text mt={"2px"} fontSize="14px">
                        {chat.title}{" "}
                      </Text>
                    </Flex>
                  </Link>
                ))
              : filteredResults.map((chat) => (
                  <Link href={`/gen-ai/${chat.id}`}>
                    <Flex
                      _hover={{
                        bg: `#f1f1f1`,
                      }}
                      w="100%"
                      borderRadius="6px"
                      padding={"10px 14px"}
                      alignItems="center"
                      gap="10px"
                    >
                      <Icon
                        color="#5D5D5D"
                        w="22px"
                        h="22px"
                        as={RiWechatLine}
                      />
                      <Text mt={"2px"} fontSize="14px">
                        {chat.title}{" "}
                      </Text>
                    </Flex>
                  </Link>
                ))}
          </Flex>
        </ModalBody>
        <ModalFooter
          borderBottom="1px solid lightgray"
          borderBottomRadius="16px"
          h="10px"
          overflow="hidden"
        ></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
