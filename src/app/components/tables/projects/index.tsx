import {
  Flex,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import {
  GRAY_COLOR,
  DARK_COLOR,
  GREEN_COLOR,
  RATE_COLOR,
} from "@/constants/colors";
import IconThreeDots from "../iconThreeDots";

type ProjectFromDB = {
  companyname: string;
  budget: number;
  status: string;
  completionrate: number;
};

export default async function ProjectsTable() {
  const response = await fetch("https://intern-01-nextjs.vercel.app//api/projects", {
    cache: "no-store",
  });
  if (!response.ok) {
    return (
      <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
        <Text>Fail to fetch data, Press F5 to refresh the page</Text>
      </Flex>
    );
  }
  const projects: ProjectFromDB[] = await response.json();

  return (
    <TableContainer w={"100%"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={"10px"} fontWeight={700} color={GRAY_COLOR}>
              COMPANIES
            </Th>
            <Th fontSize={"10px"} fontWeight={700} color={GRAY_COLOR}>
              BUDGET
            </Th>
            <Th
              fontSize={"10px"}
              fontWeight={700}
              color={GRAY_COLOR}
              textAlign={"center"}
            >
              STATUS
            </Th>
            <Th
              textAlign={"left"}
              fontSize={"10px"}
              fontWeight={700}
              color={GRAY_COLOR}
            >
              COMPLETION
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map(
            ({ companyname, budget, status, completionrate }, index) => (
              <Tr key={index}>
                <Td>
                  <Flex alignItems={"center"} gap={"15px"}>
                    {/* <img src={iconSVG} alt="logo" /> */}
                    <Box width="16px" h="16px" bg={GRAY_COLOR} />
                    <Flex flexDirection={"column"} justifyContent={"center"}>
                      <Text
                        fontSize={"14px"}
                        fontWeight={700}
                        color={DARK_COLOR}
                      >
                        {companyname}
                      </Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <Flex>
                    <Text fontSize={"14px"} fontWeight={700} color={DARK_COLOR}>
                      ${formatBudget(budget)}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Flex justifyContent={"center"}>
                    <Flex>
                      <Text
                        fontSize={"14px"}
                        fontWeight={700}
                        color={DARK_COLOR}
                      >
                        {status}
                      </Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <Flex
                    flexDir={"column"}
                    width={"125px"}
                    justifyContent={"center"}
                  >
                    <Flex>
                      <Text
                        textAlign={"center"}
                        fontWeight={700}
                        fontSize={"14px"}
                        color={GREEN_COLOR}
                      >
                        {completionrate}%
                      </Text>
                    </Flex>
                    <Flex
                      w={"100%"}
                      h={"3px"}
                      borderRadius={"1px"}
                      bg={RATE_COLOR}
                    >
                      <Box
                        w={`${completionrate}%`}
                        h={"100%"}
                        bg={GREEN_COLOR}
                        borderRadius={"1px"}
                      ></Box>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <Flex cursor="pointer">
                    <IconThreeDots />{" "}
                  </Flex>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function formatBudget(budget: number): string {
  return budget.toLocaleString("en-US", {});
}
