"use client";
import React from "react";
import { Flex } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { EditAuthorForm } from "@/components/tables/editAuthorForm";
import { useAuthor } from "@/components/services/queries";
export default function page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { data } = useAuthor(id);

  if (data) {
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
            <EditAuthorForm id={id} author={data} />
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
