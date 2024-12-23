import { Flex, Text } from "@chakra-ui/react";
import {
  DARK_COLOR,
  BG_COLOR,
  GRAY_COLOR,
  GRAY_TEXT_COLOR,
} from "@/constants/colors";
import IconDelete from "../iconDelete";
import { IconPencil } from "../iconPencil";

type BillingInfoFromDB = {
  id: number;
  fullname: string;
  companyname: string;
  email: string;
  vatnumber: string;
};

export default async function BillingInformation() {
  const response = await fetch("http://localhost:3000//api/billinginfo", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("failed to  fetch transactions");
  }
  const billingInfos: BillingInfoFromDB[] = await response.json();

  return (
    <Flex flexDir={"column"} gap={"24px"}>
      {billingInfos.map(
        ({ fullname, companyname, email, vatnumber }, index: number) => (
          <Flex
            key={index}
            bg={BG_COLOR}
            borderRadius={"12px"}
            padding={"26px"}
            justifyContent={"space-between"}
          >
            <Flex flexDir={"column"}>
              <Text
                mb={"8px"}
                fontWeight={700}
                fontSize={"14px"}
                color={GRAY_TEXT_COLOR}
              >
                {fullname}
              </Text>
              <Flex gap={"5px"}>
                <Text fontWeight={400} fontSize={"12px"} color={GRAY_COLOR}>
                  Company Name:{" "}
                </Text>
                <Text
                  fontWeight={700}
                  fontSize={"12px"}
                  color={GRAY_TEXT_COLOR}
                >
                  {companyname}
                </Text>
              </Flex>
              <Flex gap={"5px"}>
                <Text fontWeight={400} fontSize={"12px"} color={GRAY_COLOR}>
                  {" "}
                  Email address:{" "}
                </Text>
                <Text
                  fontWeight={700}
                  fontSize={"12px"}
                  color={GRAY_TEXT_COLOR}
                >
                  {email}
                </Text>
              </Flex>
              <Flex gap={"5px"}>
                <Text fontWeight={400} fontSize={"12px"} color={GRAY_COLOR}>
                  VAT Number:{" "}
                </Text>
                {"  "}
                <Text
                  fontWeight={700}
                  fontSize={"12px"}
                  color={GRAY_TEXT_COLOR}
                >
                  {vatnumber}
                </Text>
              </Flex>
            </Flex>
            <Flex gap={"21.5px"}>
              <Flex gap={"3.5px"} cursor={"pointer"}>
                <IconDelete />
                <Text
                  color={"red"}
                  fontWeight={700}
                  fontSize={"10px"}
                  mt={"3px"}
                >
                  DELETE
                </Text>
              </Flex>
              <Flex gap={"3.5px"} cursor={"pointer"}>
                <IconPencil width={15} height={15} color={DARK_COLOR} />
                <Text
                  mt={"3px"}
                  color={DARK_COLOR}
                  fontWeight={700}
                  fontSize={"10px"}
                >
                  EDIT
                </Text>
              </Flex>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
}
