"use client";

import { Flex, Box } from "@chakra-ui/react";
// import BasicForm from '../components/forms/BasicForm';
import MFormProvider from "@/components/forms/MFormProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function RTL() {
  return (
    <Flex width="100%" minW="700px" zIndex={1} right={0} flexDir="column">
      <Flex
        flex="1"
        width="100%"
        padding="24px"
        gap={"24px"}
        justifyContent={"space-around"}
      >
        {/* <Box><BasicForm /></Box> */}
        <Box>
          <QueryClientProvider client={queryClient}>
            <MFormProvider />
          </QueryClientProvider>
        </Box>
      </Flex>
    </Flex>
  );
}
