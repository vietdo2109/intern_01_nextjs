"use client";
import { Flex, Box, Text } from "@chakra-ui/react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SmallCard } from "@/components/dashboard/smallCard";
import BarChart from "@/components/dashboard/barChart";
import OrdersOverview from "@/components/dashboard/orders";
import DashboardProject from "@/components/dashboard/projects";
import LineGraph from "@/components/dashboard/lineGraph";

import { IoWallet } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

import { WHITE_COLOR, GRAY_COLOR, DARK_COLOR } from "@/constants/colors";
import Image from "next/image";
export default function Dashboard() {
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
        <Flex>
          <Header theme="dark" page="Dashboard" />
        </Flex>
        <Flex gap={"24px"}>
          <SmallCard
            title="Today’s Money"
            stat="$53,000"
            rate={55}
            icon={IoWallet}
            plus={true}
          />
          <SmallCard
            title="Today’s User"
            stat="2,300"
            rate={5}
            icon={FaGlobe}
            plus={true}
          />
          <SmallCard
            title="New Clients"
            stat="+3,052"
            rate={14}
            icon={IoDocumentText}
            plus={false}
          />
          <SmallCard
            title="Today’s Money"
            stat="$173,000"
            rate={8}
            icon={FaShoppingCart}
            plus={true}
          />
        </Flex>
        <Flex gap={"24px"}>
          <Flex
            w={"60%"}
            h={"255px"}
            bg={WHITE_COLOR}
            padding={"17.5px"}
            borderRadius={"15px"}
          >
            <Flex flex={1} justifyContent={"space-between"}>
              <Flex
                w={"40%"}
                flexDir={"column"}
                justifyContent={"space-between"}
              >
                <Flex flexDir={"column"} gap={"3px"}>
                  <Text color={GRAY_COLOR} fontSize={"12px"} fontWeight={700}>
                    Built by developers
                  </Text>
                  <Text color={DARK_COLOR} fontSize={"18px"} fontWeight={700}>
                    Purity UI Dashboard
                  </Text>
                  <Text color={GRAY_COLOR} fontSize={"14px"} fontWeight={400}>
                    From colors, cards, typography to complex elements, you will
                    find the full documentation.
                  </Text>
                </Flex>
                <Text
                  color={DARK_COLOR}
                  fontSize={"10px"}
                  fontWeight={700}
                  cursor="pointer"
                >
                  Read more
                </Text>
              </Flex>
              {/* <Box
                  bgImage={OgImage}
                  bgSize="cover"
                  bgPos={'center'}
                  w={'40%'}
                  borderRadius={'12px'}
                ></Box> */}
              <Image
                src="/images/dashboardOgImg.png"
                width={361}
                height={256}
                alt="og image"
                unoptimized={true}
                style={{ borderRadius: "15px" }}
              />
            </Flex>
          </Flex>
          <Flex
            w={"40%"}
            h={"255px"}
            bg={WHITE_COLOR}
            borderRadius={"15px"}
            padding={"17.5px"}
          >
            <Box
              position="relative"
              bgSize="cover"
              bgPos={"center"}
              w={"100%"}
              borderRadius={"12px"}
              overflow={"hidden"}
            >
              <Flex w={"100%"} h={"100%"} opacity={0.9}>
                <Image
                  src={"/images/dashboardTalkingImg.png"}
                  width={620}
                  height={265}
                  alt="talking image"
                  style={{
                    left: 0,
                    right: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    position: "absolute",
                    borderRadius: "12px",
                    zIndex: "-1",
                  }}
                ></Image>
                <Flex
                  w={"100%"}
                  flexDir={"column"}
                  justifyContent={"space-between"}
                  padding={"21px"}
                  bgGradient={
                    "linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                  }
                >
                  <Flex flexDir={"column"} gap={"3px"} w={"60%"}>
                    <Text
                      color={WHITE_COLOR}
                      fontSize={"18px"}
                      fontWeight={700}
                    >
                      Purity UI Dashboard
                    </Text>
                    <Text
                      color={WHITE_COLOR}
                      fontSize={"14px"}
                      fontWeight={400}
                    >
                      From colors, cards, typography to complex elements, you
                      will find the full documentation.
                    </Text>
                  </Flex>
                  <Text
                    color={WHITE_COLOR}
                    fontSize={"10px"}
                    fontWeight={700}
                    cursor="pointer"
                  >
                    Read more
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex gap={"24px"}>
          <BarChart />
          <LineGraph />
        </Flex>
        <Flex gap={"24px"}>
          <DashboardProject />
          <OrdersOverview />
        </Flex>
        <Footer />
      </Flex>
    </Flex>
  );
}
