import React from "react";
import { Flex } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { EditAuthorForm } from "@/components/tables/editAuthorForm";
import { AuthorFromDB } from "@/components/tables/authorsTable";

export default async function page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const response = await fetch(`http://localhost:3000/api/authors/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("failed to  fetch author");
  }

  const author: AuthorFromDB = await response.json();
  console.log(author);
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
          <EditAuthorForm id={id} author={author} />
        </Flex>
      </Flex>
    </Flex>
  );
}
