import { useState } from "react";
import { Flex, Box, Text, Icon, useDisclosure } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Todo } from "@/services/mutations";

import Tag from "../tag";
import { allTags } from "../../../types/todo/tag";
import { UpdateTaskModal } from "../updateTaskModal";
import { GRAY_COLOR } from "@/constants/colors";
import { useDeleteTodo, useEditTodo } from "@/services/mutations";

export default function TaskCard({ text, tags, type, date, id }: Todo) {
  const [isTaskMenuVisible, setIsTaskMenuVidible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log({ text, tags, type, date, id });
  const editTodoMutation = useEditTodo();
  const deleteTodoMutation = useDeleteTodo();

  return (
    <Flex
      _hover={{ bg: "#fafafa" }}
      cursor={"pointer"}
      onClick={onOpen}
      h={"200px"}
      w={"100%"}
      borderRadius={"10px"}
      border={`2px solid ${GRAY_COLOR}`}
      flexDir={"column"}
      position={"relative"}
    >
      <UpdateTaskModal
        id={id}
        todo={{ text, tags, type, date, id }}
        onClose={onClose}
        isOpen={isOpen}
      />
      <Flex
        position={"absolute"}
        width={"180px"}
        zIndex={1000}
        h={"130px"}
        shadow={"md"}
        bg={"white"}
        border={`2px solid ${GRAY_COLOR}`}
        right={"20px"}
        top={"40px"}
        borderRadius={"10px"}
        flexDir={"column"}
        display={isTaskMenuVisible ? "" : "none"}
        p="10px"
        justifyContent={"space-between"}
      >
        <Flex
          border={`2px solid ${GRAY_COLOR}`}
          borderRadius={"10px"}
          flex={1}
          p={"6px"}
          cursor={"pointer"}
          onClick={(event) => {
            event.stopPropagation(); // Prevents triggering the card's onClick

            editTodoMutation.mutate({
              id,
              date,
              tags,
              text,
              type: `${
                type === "Planned"
                  ? "Upcoming"
                  : type === "Upcoming"
                  ? "Planned"
                  : "Planned"
              }`,
            });
          }}
        >
          <Text fontWeight={700} fontSize={"12px"}>
            {type === "Planned"
              ? "Move to Upcoming tab"
              : type === "Upcoming"
              ? "Move to Planned tab"
              : "Move to Planned tab"}
          </Text>
        </Flex>
        <Flex
          border={`2px solid ${GRAY_COLOR}`}
          borderRadius={"10px"}
          p={"6px"}
          flex={1}
          cursor={"pointer"}
          onClick={(event) => {
            event.stopPropagation(); // Prevents triggering the card's onClick

            editTodoMutation.mutate({
              id,
              date,
              tags,
              text,
              type: `${
                type === "Planned"
                  ? "Completed"
                  : type === "Upcoming"
                  ? "Completed"
                  : "Upcoming"
              }`,
            });
          }}
        >
          <Text fontWeight={700} fontSize={"12px"}>
            {type === "Planned"
              ? "Move to Completed tab"
              : type === "Upcoming"
              ? "Move to Completed tab"
              : "Move to Upcoming tab"}
          </Text>
        </Flex>
        <Flex
          border={`2px solid ${GRAY_COLOR}`}
          borderRadius={"10px"}
          p={"6px"}
          flex={1}
          cursor={"pointer"}
          onClick={(event) => {
            event.stopPropagation(); // Prevents triggering the card's onClick

            deleteTodoMutation.mutate(id);
          }}
        >
          <Text fontWeight={700} fontSize={"12px"}>
            Delete
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent={"space-between"} padding={"18px"}>
        {/* Category tags */}
        <Flex h={"28px"} w={"60%"} gap={"8px"}>
          {tags.map((tagId: number) => {
            // Find the corresponding tag from allTags
            const matchedTag = allTags.find((tag) => tag.id === tagId);

            // Render the component with the matched tag if found
            return matchedTag ? (
              <Tag
                id={matchedTag.id}
                key={tagId}
                title={matchedTag.title}
                color={matchedTag.color}
                bg={matchedTag.bg}
              />
            ) : null;
          })}
        </Flex>
        <Box
          cursor={"pointer"}
          onClick={(event) => {
            event.stopPropagation(); // Prevents triggering the card's onClick

            setIsTaskMenuVidible(!isTaskMenuVisible);
          }}
        >
          <Icon
            as={HiOutlineDotsHorizontal}
            color={GRAY_COLOR}
            w={"20px"}
            h={"20px"}
          ></Icon>
        </Box>
      </Flex>

      <Flex
        paddingX={"18px"}
        flexDir={"column"}
        gap={"20px"}
        flex={1}
        position={"relative"}
      >
        <Text fontWeight={"700"} fontSize={"24px"} height={"26px"}>
          {text}
        </Text>
        <Flex
          flex={1}
          alignItems={"center"}
          gap={"6px"}
          position={"absolute"}
          bottom={"10px"}
        >
          <Icon as={FaRegCalendarAlt} color={GRAY_COLOR}></Icon>
          <Text
            mt={"6px"}
            fontWeight={"700"}
            fontSize={"16px"}
            color={GRAY_COLOR}
          >
            {date}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
