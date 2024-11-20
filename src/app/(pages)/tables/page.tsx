import { Flex, Text, Button } from "@chakra-ui/react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import AuthorsTable from "@/components/tables/authorsTable";
import ProjectsTable from "@/components/tables/projects";

import { DARK_COLOR } from "@/constants/colors";
import { Suspense } from "react";
import LoadingSpinner from "@/components/skeletons/loadingSpinner";
import Link from "next/link";
export default function Tables() {
  return (
    <Flex width="100%" minW="700px" zIndex={1} right={0} flexDir="column">
      <Flex
        flex="1"
        width="100%"
        padding="24px"
        minH={"350px"}
        gap={"24px"}
        flexDir={"column"}
      >
        <Flex flexDir={"column"}>
          <Header theme="dark" page="Tables" />
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
          <Flex justifyContent="space-between">
            <Text fontSize={"18px"} fontWeight={700} color={DARK_COLOR}>
              Authors table
            </Text>
            <Link href={`/tables/author/new-author`}>
              <Button>Add author</Button>
            </Link>
          </Flex>
          <Flex minH="400px">
            <AuthorsTable />
          </Flex>
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
          <Flex>
            <Text fontSize={"18px"} fontWeight={700} color={DARK_COLOR}>
              Projects
            </Text>
          </Flex>
          <Flex minH="300px">
            <Suspense fallback={<LoadingSpinner />}>
              <ProjectsTable />
            </Suspense>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </Flex>
  );
}
