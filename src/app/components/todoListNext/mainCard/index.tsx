import { Flex, Box, Text, Button, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import TaskCard from "../taskCard";
import { ModalType } from "../../../types/todo/modal";
import { Todo } from "@/components/services/mutations";
import { FC } from "react";
import {
  BLUE_DOT_COLOR,
  GREEN_DOT_COLOR,
  GREEN_COLOR,
  ORANGE_DOT_COLOR,
  GRAY_COLOR,
} from "@/constants/colors";
import { TaskType, useModalType } from "../modalTypeProvider";
import { useTodos, useUserDTOTodoIds } from "@/components/services/queries";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonArticle from "@/components/skeletons/skeletonArticle";

type MainCardProps = {
  type: TaskType;
  modalProps: ModalType;
};

export const MainCard: FC<MainCardProps> = ({ type, modalProps }) => {
  const { setModaltype } = useModalType();

  const handleToggleModal = (type: TaskType) => {
    setModaltype(type);
    modalProps.onOpen();
  };
  let taskCount = 0;
  const { isPending, error, data } = useTodos();

  const userDTO = useUserDTOTodoIds();

  const filteredData = data?.filter((todo) => {
    return userDTO.data?.todoIds?.includes(todo.id);
  });

  console.log("filtered: " + filteredData);
  if (error) {
    return <Text>fail to fetch</Text>;
  }

  if (isPending) {
    return (
      <Flex
        borderRadius="15px"
        bg={"white"}
        minH={"300px"}
        flex={1}
        flexDir={"column"}
        gap={"20px"}
        p={"20px"}
      >
        <SkeletonArticle />
      </Flex>
    );
  }
  if (filteredData) {
    for (const todo of filteredData) {
      if (todo.type === type) {
        taskCount++;
      }
    }
    return (
      <Flex
        borderRadius="15px"
        bg={"white"}
        minH={"300px"}
        flex={1}
        flexDir={"column"}
        gap={"20px"}
        p={"20px"}
      >
        <Flex justifyContent={"space-between"}>
          <Flex gap={"10px"}>
            <Box
              mt={"3px"}
              borderRadius={"50%"}
              w={"10px"}
              h={"10px"}
              bg={
                type === "Planned"
                  ? ORANGE_DOT_COLOR
                  : type === "Upcoming"
                  ? BLUE_DOT_COLOR
                  : GREEN_DOT_COLOR
              }
            ></Box>
            <Text fontWeight={700} fontSize={"14px"} textAlign={"center"}>
              {type + ""}
            </Text>
          </Flex>

          <Text color={GRAY_COLOR} fontWeight={700} fontSize={"14px"}>
            {taskCount} {type === "Completed" ? "completed" : "open"} tasks
          </Text>
        </Flex>

        <Button
          width={"100%"}
          h={"50px"}
          bg={GREEN_COLOR}
          _hover={{ bg: "teal" }}
          display={"flex"}
          alignItems="center"
          gap={"10px"}
          onClick={() => handleToggleModal(type)}
        >
          <Icon as={FaPlus} color={"white"}></Icon>
          <Text mt={"5px"} color={"white"}>
            Add task
          </Text>
        </Button>

        {filteredData.map(
          (todo: Todo) =>
            todo?.type === type && (
              <TaskCard
                key={todo.id}
                text={todo.text}
                tags={todo.tags}
                type={todo.type}
                id={todo.id}
                date={todo.date}
              />
            )
        )}
      </Flex>
    );
  }
};
