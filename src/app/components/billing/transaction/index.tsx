import { Flex, Text } from "@chakra-ui/react";

import {
  RED_COLOR,
  DARK_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
} from "@/constants/colors";
import ArrowDown from "../arrowDown";
import ArrowUp from "../arrowUp";
import Exclaimation from "../exclaimation";

type TransactionFromDB = {
  id: number;
  companyname: string;
  date: Date;
  value: number;
  status: string;
};
export default async function Transactions() {
  const response = await fetch(
    "https://intern-01-nextjs-ivh7s0ild-viet21s-projects.vercel.app//api/transactions",
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("failed to  fetch transactions");
  }
  const transactions: TransactionFromDB[] = await response.json();

  return (
    <Flex flexDir={"column"} gap={"24px"}>
      {transactions.map(
        ({ companyname, date, value, status }, index: number) => {
          const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(new Date(date));
          return (
            <Flex
              key={index}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"14px"}
            >
              <Flex
                w={"35px"}
                h={"35px"}
                justifyContent={"center"}
                alignItems={"center"}
                border={`1px solid ${
                  status === "pending"
                    ? GRAY_COLOR
                    : status === "minus"
                    ? RED_COLOR
                    : GREEN_COLOR
                }`}
                borderRadius={"50%"}
              >
                {status === "minus" ? (
                  <ArrowDown />
                ) : status === "plus" ? (
                  <ArrowUp />
                ) : (
                  <Exclaimation />
                )}
              </Flex>
              <Flex flexDir={"column"} flex={1} gap={"4.5px"}>
                <Text fontSize={"14px"} fontWeight={"700"} color={DARK_COLOR}>
                  {companyname}
                </Text>
                <Text fontSize={"14px"} fontWeight={"700"} color={GRAY_COLOR}>
                  {formattedDate}
                </Text>
              </Flex>
              <Flex h={"100%"} alignItems={"center"}>
                <Text
                  color={
                    status === "pending"
                      ? DARK_COLOR
                      : status === "minus"
                      ? RED_COLOR
                      : GREEN_COLOR
                  }
                  fontWeight={700}
                  fontSize={"14px"}
                >
                  {status === "pending"
                    ? "Pending"
                    : status === "minus"
                    ? `-$${value * -1}`
                    : `+$${value}`}
                </Text>
              </Flex>
            </Flex>
          );
        }
      )}
    </Flex>
  );
}
