import {
  Flex,
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import IconCalendar from "@/components/billing/iconCalendar";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Invoices from "@/components/billing/invoice";
import BillingInformation from "@/components/billing/billingInformation";
import Transactions from "@/components/billing/transaction";
import {
  WHITE_COLOR,
  GRAY_COLOR,
  DARK_COLOR,
  GREEN_COLOR,
} from "@/constants/colors";
import Image from "next/image";
import { IconPencil } from "@/components/billing/iconPencil";
import { IconWallet } from "@/components/billing/iconWallet";
import { IconPaypal } from "@/components/billing/iconPaypal";
import { Suspense } from "react";
import LoadingSpinner from "@/components/skeletons/loadingSpinner";

export default function Billing() {
  return (
    <Flex width="100%" minW="700px" zIndex={1} right={0} flexDir="column">
      <Flex
        flex="1"
        width="100%"
        justify="center"
        padding="24px"
        minH={"350px"}
        gap={"24px"}
        flexDir={"column"}
      >
        <Flex>
          <Header theme="dark" page="Billing" />
        </Flex>

        <Flex w={"100%"} h={"436px"} gap={"24px"}>
          <Flex flex={1} gap={"24px"} height={"100%"} flexDir={"column"}>
            <Flex h={"241px"} gap={"24px"}>
              <Flex
                flex={1}
                bg={WHITE_COLOR}
                borderRadius="15px"
                overflow="hidden"
                position="relative"
              >
                <Image
                  src={"/images/billingCardBg.png"}
                  width={925}
                  height={482}
                  alt="card"
                  unoptimized={true}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    margin: "auto",
                  }}
                ></Image>
                <Box
                  w="100%"
                  h="100%"
                  bgSize="cover"
                  display="flex"
                  padding={"22px"}
                  zIndex={1000}
                >
                  <Flex
                    width="100%"
                    paddingX={"8px"}
                    flexDir={"column"}
                    p="10px"
                  >
                    <Flex width="100%" justifyContent="space-between" flex={1}>
                      <Text color={"#FFFFFF"} fontSize="18px" fontWeight={700}>
                        Purity UI
                      </Text>
                      <Box>
                        <Image
                          src={"/svgs/masterCardGrayLogo.svg"}
                          alt="card logo"
                          width={50}
                          height={33}
                        />
                      </Box>
                    </Flex>

                    <Flex flexDir="column" gap={"13px"}>
                      <Text color={"#FFFFFF"} fontSize="24px" fontWeight={700}>
                        7812 2139 0823 XXXX
                      </Text>

                      <Flex gap={"33px"}>
                        <Flex flexDir="column">
                          <Text
                            color={"#FFFFFF"}
                            fontSize="10px"
                            fontWeight={400}
                          >
                            VALID THRU
                          </Text>
                          <Text
                            color={"#FFFFFF"}
                            fontSize="14px"
                            fontWeight={700}
                          >
                            05/24
                          </Text>
                        </Flex>

                        <Flex flexDir="column">
                          <Text
                            color={"#FFFFFF"}
                            fontSize="10px"
                            fontWeight={400}
                          >
                            CVV
                          </Text>
                          <Text
                            color={"#FFFFFF"}
                            fontSize="14px"
                            fontWeight={700}
                          >
                            09X
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
              <Flex
                h={"240px"}
                w={"240px"}
                bg={WHITE_COLOR}
                borderRadius="15px"
                flexDir={"column"}
                p={"30px 0 25.5px 0"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"22px"}
              >
                <Flex
                  p={"19px"}
                  borderRadius={"12px"}
                  bg={"#4FD1C5"}
                  w={"64px"}
                >
                  <IconWallet
                    width={26}
                    height={26}
                    color={"#FFFFFF"}
                  ></IconWallet>
                </Flex>
                <Flex
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"8px"}
                >
                  <Text color={DARK_COLOR} fontSize={"18px"} fontWeight={700}>
                    Salary
                  </Text>
                  <Text color={GRAY_COLOR} fontSize={"12px"} fontWeight={700}>
                    Belong Interactive
                  </Text>
                  <Box
                    h="2px"
                    w="100%"
                    bgGradient="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)"
                  ></Box>
                  <Text color={DARK_COLOR} fontSize={"18px"} fontWeight={700}>
                    +$2000
                  </Text>
                </Flex>
              </Flex>
              <Flex
                h={"240px"}
                w={"240px"}
                bg={WHITE_COLOR}
                borderRadius="15px"
                flexDir={"column"}
                p={"30px 0 25.5px 0"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"22px"}
              >
                <Flex
                  p={"19px"}
                  borderRadius={"12px"}
                  bg={"#4FD1C5"}
                  w={"64px"}
                >
                  <IconPaypal
                    width={26}
                    height={26}
                    color={"#FFFFFF"}
                  ></IconPaypal>
                </Flex>
                <Flex
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"8px"}
                >
                  <Text color={DARK_COLOR} fontSize={"18px"} fontWeight={700}>
                    Paypal
                  </Text>
                  <Text color={GRAY_COLOR} fontSize={"12px"} fontWeight={700}>
                    Freelance Payment
                  </Text>
                  <Box
                    h="2px"
                    w="100%"
                    bgGradient="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)"
                  ></Box>
                  <Text color={DARK_COLOR} fontSize={"18px"} fontWeight={700}>
                    $455.00
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              bg={WHITE_COLOR}
              borderRadius="15px"
              flex={1}
              p={"24px"}
              flexDir={"column"}
            >
              <Flex w={"100%"} flex={1} justifyContent={"space-between"}>
                <Text color={DARK_COLOR} fontSize={"14px"} fontWeight={700}>
                  Payment Method
                </Text>
                <Button
                  bgGradient="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                  w={"134.5px"}
                  h={"35px"}
                  borderRadius={"12px"}
                  colorScheme={DARK_COLOR}
                >
                  <Text
                    textAlign={"center"}
                    fontSize={"10px"}
                    fontWeight={700}
                    color={"#FFFFFF"}
                  >
                    ADD A NEW CARD
                  </Text>
                </Button>
              </Flex>
              <Flex flex={1} gap={"24.5px"}>
                <InputGroup
                  flex={1}
                  borderRadius={"15px"}
                  display={"flex"}
                  gap={"20px"}
                  border={"1px solid #E2E8F0"}
                >
                  <InputLeftElement
                    pointerEvents="none"
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"100%"}
                    width={"50px"}
                    marginRight={"20px"}
                  >
                    <Image
                      src={"/svgs/masterCardLogo.svg"}
                      alt="mastercard icon"
                      width={21}
                      height={15}
                      unoptimized={true}
                    />
                  </InputLeftElement>
                  <Input
                    paddingLeft={"50px"}
                    placeholder="7812 2139 0823 XXXX"
                    borderRadius={"15px"}
                    fontSize={"14px"}
                    fontWeight={400}
                    height={"65px"}
                    border={"none"}
                    paddingX={"50px"}
                  />
                  <InputRightElement
                    pointerEvents="none"
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"100%"}
                    width={"50px"}
                  >
                    <IconPencil
                      color={DARK_COLOR}
                      width={12}
                      height={12}
                    ></IconPencil>
                  </InputRightElement>
                </InputGroup>
                <InputGroup
                  flex={1}
                  borderRadius={"15px"}
                  display={"flex"}
                  gap={"20px"}
                  border={"1px solid #E2E8F0"}
                >
                  <InputLeftElement
                    pointerEvents="none"
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"100%"}
                    width={"50px"}
                    marginRight={"20px"}
                  >
                    <Image
                      src={"/svgs/visaLogo.svg"}
                      alt="mastercard icon"
                      width={25}
                      height={9}
                      unoptimized={true}
                    />
                  </InputLeftElement>
                  <Input
                    paddingLeft={"50px"}
                    placeholder="7812 2139 0823 XXXX"
                    borderRadius={"15px"}
                    fontSize={"14px"}
                    fontWeight={400}
                    height={"65px"}
                    border={"none"}
                    paddingX={"50px"}
                  />
                  <InputRightElement
                    pointerEvents="none"
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"100%"}
                    width={"50px"}
                  >
                    <IconPencil
                      color={DARK_COLOR}
                      width={12}
                      height={12}
                    ></IconPencil>
                  </InputRightElement>
                </InputGroup>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w={"35%"}
            bg={WHITE_COLOR}
            borderRadius="15px"
            height={"100%"}
            flexDir={"column"}
            p={"24.5px"}
          >
            <Flex w={"100%"} flex={1} justifyContent={"space-between"}>
              <Text color={DARK_COLOR} fontSize="18px" fontWeight={700}>
                Invoices
              </Text>
              <Button
                w={"110.5px"}
                h={"35px"}
                bg={"#FFFFFF"}
                py={"5px"}
                justifySelf={"flex-end"}
                colorScheme="teal"
                variant="outline"
                borderRadius="12px"
                border="2px solid #4FD1C5"
              >
                <Text
                  color={GREEN_COLOR}
                  fontSize="10px"
                  fontWeight={700}
                  textAlign={"center"}
                >
                  VIEW ALL
                </Text>
              </Button>
            </Flex>
            <Flex flexDir={"column"} flex={1} gap={"24.5px"} minH="320px">
              <Suspense fallback={<LoadingSpinner />}>
                <Invoices />
              </Suspense>
            </Flex>
          </Flex>
        </Flex>

        <Flex w={"100%"} gap={"24px"}>
          <Flex w={"60%"} bg={WHITE_COLOR} borderRadius="15px" height={"100%"}>
            <Flex w={"100%"} p={"24px"} gap={"17.5px"} flexDir={"column"}>
              <Text fontWeight={700} fontSize={"18px"} color={DARK_COLOR}>
                Billing Information
              </Text>
              <Suspense fallback={<LoadingSpinner />}>
                <BillingInformation />
              </Suspense>
            </Flex>
          </Flex>
          <Flex flex={1} bg={WHITE_COLOR} borderRadius="15px" minH="550px">
            <Flex
              flex={1}
              paddingX={"21px"}
              paddingY={"25px"}
              flexDir={"column"}
              gap={"18px"}
            >
              <Flex w={"100%"} justifyContent={"space-between"}>
                <Text fontWeight={700} fontSize={"18px"} color={DARK_COLOR}>
                  Your Transactions
                </Text>
                <Flex justifyContent={"center"} gap={"6px"}>
                  <IconCalendar />{" "}
                  <Text fontSize={"14px"} fontWeight={700} color={GRAY_COLOR}>
                    {selectedDate}
                  </Text>
                </Flex>
              </Flex>

              <Suspense fallback={<LoadingSpinner />}>
                <Transactions />{" "}
              </Suspense>
            </Flex>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </Flex>
  );
}
const selectedDate = "23 - 30 March 2020";
