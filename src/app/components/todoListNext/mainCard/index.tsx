import { Flex, Box, Text, Button, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import TaskCard from "../taskCard";
import { ModalType } from "../../../types/todoTypes/modal";

import { useGetTodosQuery } from "@/state/todos/todosApiSlice";
import { Todo } from "../../../state/todo/todoSlice";
import { FC } from "react";
import {
  blueDotColor,
  greenDotColor,
  greenColor,
  orangeDotColor,
  grayColor,
} from "@/constants/colors";
import { ModalTypeState } from "@/types/todoModalTypes";
import { useModalType } from "../modalTypeProvider";
import { useState, useEffect } from "react";
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

  const [todos, setTodos] = useState<Todo[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Text>loading...</Text>;
  }
  if (!todos) {
    return <Text>fail to fetch</Text>;
  }
  if (todos) {
    for (const todo of todos) {
      if (todo.type?.value === type) {
        taskCount++;
      }
    }
    console.log(todos);
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
                  ? orangeDotColor
                  : type.value === "Upcoming"
                  ? blueDotColor
                  : greenDotColor
              }
            ></Box>
            <Text fontWeight={700} fontSize={"14px"} textAlign={"center"}>
              {type.value}
            </Text>
          </Flex>

          <Text color={grayColor} fontWeight={700} fontSize={"14px"}>
            {taskCount} {type.value === "Completed" ? "completed" : "open"}{" "}
            tasks
          </Text>
        </Flex>

        <Button
          width={"100%"}
          h={"50px"}
          bg={greenColor}
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

        {todos.map(
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
