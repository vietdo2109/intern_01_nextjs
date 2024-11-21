import React from "react";
import { Flex } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { AddAuthorForm } from "@/components/tables/addAuthorForm";

export default async function page() {
  return (
    <Flex width="100%" minW="700px" zIndex={1} right={0} flexDir="column">
      <Flex
        flex="1"
        width="100%"
        padding="24px"
        minH="100vh"
        gap={"24px"}
        flexDir={"column"}
      >
        <Flex>
          <Header theme="dark" page="Tables / Author profile edit" />
        </Flex>
        <Flex
          paddingX={"21px"}
          paddingY={"28px"}
          flexDir={"column"}
          w={"100%"}
          bg={"#FFFFFF"}
          borderRadius={"15px"}
          gap={"23.5px"}
        >
          <AddAuthorForm />
        </Flex>
      </Flex>
    </Flex>
  );
}
