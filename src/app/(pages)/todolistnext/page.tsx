"use client";

import { Flex, useDisclosure } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { MainCard } from "@/components/todoListNext/mainCard";
import AddTaskModal from "@/components/todoListNext/addTaskModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
import { ModalTypeProvider } from "@/components/todoListNext/modalTypeProvider";
export default function TodoListNext() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalTypeProvider>
        <Flex width="100%" minW="700px" zIndex={1} right={0} flexDir="column">
          <AddTaskModal isOpen={isOpen} onClose={onClose} />
          <Flex
            flex="1"
            width="100%"
            padding="24px"
            gap={"24px"}
            minH={"100vh"}
            flexDirection={"column"}
          >
            {/*  Header  */}
            <Flex w={"100%"}>
              <Header theme="dark" page="To-do List" />
            </Flex>

            {/*  Main Content  */}
            <Flex width={"100%"} gap={"24px"} alignItems={"flex-start"}>
              <MainCard
                type={{ value: "Planned" }}
                modalProps={{ isOpen, onOpen, onClose }}
              />
              <MainCard
                type={{ value: "Upcoming" }}
                modalProps={{ isOpen, onOpen, onClose }}
              />
              <MainCard
                type={{ value: "Completed" }}
                modalProps={{ isOpen, onOpen, onClose }}
              />
            </Flex>
          </Flex>
        </Flex>
      </ModalTypeProvider>
    </QueryClientProvider>
  );
}
