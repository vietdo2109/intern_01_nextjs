import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { allTags } from "@/types/todoTypes/tag";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Todo } from "@/state/todo/todoSlice";
// import { addTask } from "@state/todo/TodoSlice";
import { useModalType } from "../modalTypeProvider";

import { useTodos } from "@/components/services/queries";
import { useCreateTodo } from "@/components/services/mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoYupSchema } from "@/schemas/yupSchema";
import { DARK_COLOR } from "@/constants/colors";
export default function AddTaskModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { modalType } = useModalType();
  const todos = useTodos();
  const createTodoMutation = useCreateTodo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<Omit<Todo, "id" | "type">>({
    defaultValues: {
      text: "",
      date: "",
      tags: [],
    },
    resolver: yupResolver(todoYupSchema),
  });

  const onSubmit: SubmitHandler<Omit<Todo, "id" | "type">> = (
    data: Omit<Todo, "id" | "type">
  ) => {
    const newId = nextTodoId(todos.data || []);

    const numericTags = data?.tags?.map((tag) => Number(tag));
    const newTask: Todo = {
      ...data,
      tags: numericTags,
      id: newId,
      type: modalType,
    };
    // dispatch(addTask(newTask));
    createTodoMutation.mutate(newTask);
    onClose();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // Reset form values
      onClose(); // Close modal
    }
  }, [isSubmitSuccessful, reset, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Add ${modalType.value} Task`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              justifyContent={"space-between"}
              gap={"10px"}
              flexDir="column"
            >
              <Flex pt={"10px"} gap={"30px"} h={"100%"}>
                <Text fontWeight={700} fontSize={"18px"} width="30%">
                  Task:
                </Text>
                <Flex flexDir="column" width="100%" height="60px">
                  <Input
                    type="text"
                    maxLength={30}
                    placeholder={"Type here..."}
                    border={`${
                      errors.text ? "1px solid red" : `1px solid ${DARK_COLOR}`
                    }`}
                    {...register("text", { required: false, maxLength: 30 })}
                    _placeholder={{ fontSize: "14px" }}
                  ></Input>
                  {errors.text?.message && (
                    <Text ml="10px" mt="5px" fontSize={"10px"} color="red">
                      {errors.text?.message}
                    </Text>
                  )}
                </Flex>
              </Flex>

              <Flex pt={"10px"} gap={"30px"} h={"100%"}>
                <Text fontWeight={700} fontSize={"18px"} width="30%">
                  Due date:
                </Text>

                <Flex flexDir="column" width="100%" height="60px">
                  <Input
                    type="text"
                    placeholder={"14 Jan, 8:00 PM 6 Aug, ..."}
                    _placeholder={{ fontSize: "14px" }}
                    border={`${
                      errors.date ? "1px solid red" : `1px solid ${DARK_COLOR}`
                    }`}
                    {...register("date", { required: false, maxLength: 30 })}
                  ></Input>
                  {errors.date?.message && (
                    <Text ml="10px" mt="5px" fontSize={"10px"} color="red">
                      {errors.date?.message}
                    </Text>
                  )}
                </Flex>
              </Flex>

              <Flex pt={"10px"} h={"100%"}>
                <Text fontWeight={700} fontSize={"18px"} width="30%">
                  Tags:
                </Text>

                <Flex flexDir={"column"} gap={"20px"} flex={1}>
                  {allTags.map((tag) => {
                    return (
                      <label
                        style={{ display: "flex", gap: "5px" }}
                        htmlFor="field-rain"
                        key={tag.id}
                      >
                        <input
                          style={{
                            width: "16px",
                            marginBottom: "5px",
                            border: `${
                              errors.tags
                                ? "1px solid red"
                                : `1px solid ${DARK_COLOR}`
                            }`,
                          }}
                          type="checkbox"
                          value={tag.id}
                          {...register("tags")}
                          id={tag.title}
                        />
                        <Text fontWeight={700} color={tag.color}>
                          {tag.title}
                        </Text>
                      </label>
                    );
                  })}
                </Flex>
                {errors.tags?.message && (
                  <Text ml="10px" mt="5px" fontSize={"10px"} color="red">
                    {errors.tags?.message}
                  </Text>
                )}
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" onClick={onClose}>
              close
            </Button>{" "}
            <Box w={"20px"}></Box>
            <Button colorScheme="blue" type="submit">
              Add task
            </Button>
            {/* <DevTool control={control} /> */}
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

function nextTodoId(todos: Todo[]) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}
