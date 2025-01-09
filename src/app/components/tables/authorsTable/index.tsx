"use client";

import {
  Flex,
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
  WHITE_COLOR,
  GRAY_COLOR,
  DARK_COLOR,
  GRAY_TEXT_COLOR,
  ONLINE_STATUS_COLOR,
  OFFLINE_STATUS_COLOR,
} from "@/constants/colors";
import Link from "next/link";
import { useAuthors } from "@/services/queries";
const defaultAvatar = "/images/defaultAvatar.jpg";
import LoadingSpinner from "@/components/skeletons/loadingSpinner";
let authors = [];
export default function AuthorsTable() {
  const { data, error, status } = useAuthors();
  if (error) {
    return (
      <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
        <Text>Fail to fetch data, Press F5 to refresh the page</Text>
      </Flex>
    );
  }

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (data) {
    authors = data;

    return (
      <TableContainer w={"100%"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={"10px"} fontWeight={700} color={GRAY_COLOR}>
                AUTHOR
              </Th>
              <Th fontSize={"10px"} fontWeight={700} color={GRAY_COLOR}>
                FUNCTION
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
                textAlign={"center"}
                fontSize={"10px"}
                fontWeight={700}
                color={GRAY_COLOR}
              >
                EMPLOYED
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {authors.map(
              (
                {
                  id,
                  fullname,
                  email,
                  function1,
                  function2,
                  status,
                  employeddate,
                  avatar,
                },
                index: number
              ) => {
                const formatedDate = formatDate(employeddate);
                return (
                  <Tr key={index}>
                    <Td>
                      <Flex alignItems={"center"} gap={"15px"}>
                        <Flex
                          w={"40px"}
                          h={"40px"}
                          bg={GRAY_COLOR}
                          borderRadius={"12px"}
                          overflow={"hidden"}
                        >
                          <img
                            src={avatar ? avatar : defaultAvatar}
                            alt="avatar"
                            style={{
                              width: "auto",
                              height: "auto",
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        </Flex>
                        <Flex
                          flexDirection={"column"}
                          justifyContent={"center"}
                        >
                          <Text
                            fontSize={"14px"}
                            fontWeight={700}
                            color={DARK_COLOR}
                          >
                            {fullname}
                          </Text>
                          <Text
                            fontSize={"14px"}
                            fontWeight={700}
                            color={GRAY_TEXT_COLOR}
                          >
                            {email}
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex flexDirection={"column"}>
                        <Text
                          fontSize={"14px"}
                          fontWeight={700}
                          color={DARK_COLOR}
                        >
                          {function1}
                        </Text>
                        <Text
                          fontSize={"14px"}
                          fontWeight={700}
                          color={GRAY_TEXT_COLOR}
                        >
                          {function2}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex justifyContent={"center"}>
                        <Flex
                          width={"65px"}
                          h={"25px"}
                          borderRadius={"8px"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          bg={
                            status === "Online"
                              ? ONLINE_STATUS_COLOR
                              : OFFLINE_STATUS_COLOR
                          }
                        >
                          <Text
                            textAlign={"center"}
                            fontWeight={700}
                            fontSize={"14px"}
                            color={WHITE_COLOR}
                          >
                            {status}
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Text
                        textAlign={"center"}
                        fontWeight={700}
                        fontSize={"14px"}
                        color={DARK_COLOR}
                      >
                        {formatedDate}
                      </Text>
                    </Td>
                    <Td>
                      <Link href={`/tables/author/${id}`}>
                        <Text
                          color={GRAY_TEXT_COLOR}
                          fontSize={"12px"}
                          fontWeight={700}
                          cursor={"pointer"}
                        >
                          edit
                        </Text>
                      </Link>
                    </Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
}

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
  return `${day}/${month}/${year}`;
};
