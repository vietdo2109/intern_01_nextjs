import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { allTags } from "../../../types/todo/tag";
import { useForm } from "react-hook-form";
import { Todo } from "@/state/todo/todoSlice";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "@/state/todos/todosApiSlice";
import { FC } from "react";

type UpdateTaskModalProps = {
  todo: Todo;
  id: number;
  isOpen: boolean;
  onClose: () => void;
};

export const UpdateTaskModal: FC<UpdateTaskModalProps> = ({
  todo,
  id,
  isOpen,
  onClose,
}) => {
  const modalTypeValue = useSelector(
    (state: RootState) => state.modalType.value
  );

  // const todos = useSelector((state: RootState) => state.todos);
  const [updateTodoMutation] = useUpdateTodoMutation();

  const { register, handleSubmit } = useForm<Omit<Todo, "id" | "type">>({
    defaultValues: {
      text: todo.text,
      date: todo.date,
      tags: todo.tags,
    },
  });

  const { data: todos = [] } = useGetTodosQuery({});

  const onSubmit: SubmitHandler<Omit<Todo, "id" | "type">> = (
    data: Omit<Todo, "id" | "type">
  ) => {
    console.log(todos);
    const numericTags = data?.tags?.map((tag) => Number(tag));
    const updatedProps: Omit<Todo, "id" | "type"> = {
      ...data,
      tags: numericTags,
    };

    updateTodoMutation({ id, ...updatedProps });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update {modalTypeValue} Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"space-between"} gap={"20px"}>
              <Flex
                flexDir={"column"}
                pt={"10px"}
                gap={"30px"}
                justifyContent={"center"}
                h={"100%"}
              >
                <Text fontWeight={700} fontSize={"18px"}>
                  Task:
                </Text>
                <Text fontWeight={700} fontSize={"18px"}>
                  Due date:
                </Text>
                <Text fontWeight={700} fontSize={"18px"}>
                  Tags:
                </Text>
              </Flex>
              <Flex flexDir={"column"} gap={"20px"} flex={1}>
                <Input
                  type="text"
                  maxLength={30}
                  placeholder={"Type here..."}
                  {...register("text", { required: false, maxLength: 30 })}
                  _placeholder={{ fontSize: "14px" }}
                ></Input>

                <Input
                  type="text"
                  placeholder={"14 Jan, 8:00 PM 6 Aug, ..."}
                  _placeholder={{ fontSize: "14px" }}
                  {...register("date", { required: false, maxLength: 30 })}
                ></Input>

                {allTags.map((tag) => {
                  return (
                    <label
                      style={{ display: "flex", gap: "5px" }}
                      htmlFor="field-rain"
                      key={tag.id}
                    >
                      <input
                        style={{ width: "16px", marginBottom: "5px" }}
                        type="checkbox"
                        value={tag.id}
                        defaultChecked={todo.tags.includes(tag.id)}
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
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" onClick={onClose}>
              close
            </Button>
            <Box w={"20px"}></Box>
            <Button colorScheme="blue" type="submit">
              Update task
            </Button>
            {/* <DevTool control={control} /> */}
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
