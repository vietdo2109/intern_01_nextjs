import { Flex, Text } from "@chakra-ui/react";
import { GRAY_COLOR, DARK_COLOR } from "@/constants/colors";
import { IconDocument } from "../iconDocument";

type InvoiceFromDB = {
  id: number;
  date: Date;
  code: string;
  value: number;
};
export default async function Invoices() {
  const response = await fetch(
    "https://intern-01-nextjs.vercel.app/api/invoices",
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("failed to  fetch invoices");
  }
  const invoices: InvoiceFromDB[] = await response.json();

  return (
    <>
      {invoices.map(({ date, code, value }) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        });
        return (
          <Flex
            w={"100%"}
            key={code}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Flex flexDir={"column"} flex={1} gap={"5px"}>
              <Text color={DARK_COLOR} fontSize="14px" fontWeight={700}>
                {formattedDate}
              </Text>
              <Text color={GRAY_COLOR} fontSize="12px" fontWeight={700}>
                {code}
              </Text>
            </Flex>
            <Flex gap={"16px"} justifyContent={"center"} alignItems={"center"}>
              <Text color={GRAY_COLOR} fontSize="12px" fontWeight={700}>
                ${value}
              </Text>
              <Flex alignItems={"center"} gap={"2px"} justifyContent={"center"}>
                <IconDocument />
                <Text color={DARK_COLOR} fontSize="10px" fontWeight={700}>
                  PDF
                </Text>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
}
