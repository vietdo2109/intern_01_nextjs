import { Flex, Box, Text, Button, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import TaskCard from "../taskCard";
import { ModalType } from "../../../types/todo/modal";
import { Todo } from "../../../state/todo/todoSlice";
import { FC } from "react";
import {
  BLUE_DOT_COLOR,
  GREEN_DOT_COLOR,
  GREEN_COLOR,
  ORANGE_DOT_COLOR,
  GRAY_COLOR,
} from "@/constants/colors";
import { ModalTypeState } from "@/types/todoModal";
import { useModalType } from "../modalTypeProvider";
import { useTodos } from "@/components/services/queries";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect, useCallback } from "react";
import SkeletonArticle from "@/components/skeletons/skeletonArticle";

type MainCardProps = {
  type: ModalTypeState;
  modalProps: ModalType;
};

export const MainCard: FC<MainCardProps> = ({ type, modalProps }) => {
  const { setModaltype } = useModalType();

  const handleToggleModal = (type: ModalTypeState) => {
    setModaltype(type);
    modalProps.onOpen();
  };
  let taskCount = 0;
  const { isPending, error, data } = useTodos();

  const [userInfo, setUserInfo] = useState<{
    username: string;
    todoIds: number[];
  } | null>(null);

  const cachedFn = useCallback(async () => {
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, []);

  useEffect(() => {
    cachedFn();
  }, [data, cachedFn]);

  const filteredData = data?.filter((todo) =>
    userInfo?.todoIds?.includes(todo.id)
  );

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
      if (todo.type?.value === type.value) {
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
                type.value === "Planned"
                  ? ORANGE_DOT_COLOR
                  : type.value === "Upcoming"
                  ? BLUE_DOT_COLOR
                  : GREEN_DOT_COLOR
              }
            ></Box>
            <Text fontWeight={700} fontSize={"14px"} textAlign={"center"}>
              {type.value}
            </Text>
          </Flex>

          <Text color={GRAY_COLOR} fontWeight={700} fontSize={"14px"}>
            {taskCount} {type.value === "Completed" ? "completed" : "open"}{" "}
            tasks
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
            todo.type?.value === type.value && (
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
