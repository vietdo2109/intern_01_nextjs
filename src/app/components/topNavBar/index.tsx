import { Box, HStack, Flex, Icon, Text, Button } from "@chakra-ui/react";

import { FaCircleUser } from "react-icons/fa6";
import { FaKey } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
// import WhiteLogo from "../../public/logos/faviconWhite.svg";
// import BlackLogo from "../../public/logos/faviconBlack.svg";
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";

type TopNavBarProps = {
  shadow: boolean;
  logoColor: string;
  textColor: string;
  BG_COLOR: string;
  btnColor: string;
  btnTextColor: string;
};
export const TopNavBar: FC<TopNavBarProps> = ({
  shadow,
  logoColor,
  textColor,
  BG_COLOR,
  btnColor,
  btnTextColor,
}) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      minW="800px"
      width="60%"
      height="70px"
      bg={BG_COLOR}
      padding="20px"
      borderRadius="15px"
      shadow={shadow === true ? "md" : "none"}
    >
      <Link href={"/dashboard"}>
        <HStack
          justifyItems={"center"}
          alignItems={"center"}
          gap={"10px"}
          cursor={"pointer"}
        >
          <Image
            src={
              logoColor === "black"
                ? "/logos/faviconBlack.svg"
                : "/logos/faviconWhite.svg"
            }
            unoptimized={true}
            width={22}
            height={22}
            alt="logo"
          />
          <Text
            fontWeight="700"
            color={textColor}
            fontSize="14px"
            className="title"
          >
            PURITY UI DASHBOARD
          </Text>
        </HStack>
      </Link>

      <Flex alignItems={"center"} justifyContent={"space-around"} gap={"30px"}>
        <Flex alignItems={"center"} className="nav-container">
          <Link href="/dashboard">
            <Box
              display="flex"
              alignItems={"center"}
              gap={"4px"}
              className="nav-container"
            >
              <Icon w="11px" h="11px" as={BsBoxFill} color={textColor} />
              <Box h="11px">
                <Text fontSize={"10px"} fontWeight={700} color={textColor}>
                  DASHBOARD
                </Text>
              </Box>
            </Box>
          </Link>
        </Flex>
        <Flex display="flex" alignItems={"center"} className="nav-container">
          <Link href="/profile">
            <Box display="flex" alignItems={"center"} gap="4px">
              <Icon w="11px" h="11px" color={textColor} as={FaUser} />
              <Box h="11px">
                <Text fontSize={"10px"} fontWeight={700} color={textColor}>
                  PROFILE
                </Text>
              </Box>
            </Box>
          </Link>
        </Flex>
        <Flex alignItems={"center"} gap={"4px"}>
          <Link href="/signup">
            <Box display="flex" alignItems={"center"} gap="4px">
              <Icon w="11px" h="11px" color={textColor} as={FaCircleUser} />
              <Box h="11px">
                <Text fontSize={"10px"} fontWeight={700} color={textColor}>
                  SIGN UP
                </Text>
              </Box>
            </Box>
          </Link>
        </Flex>
        <Flex alignItems={"center"} gap={"4px"} className="nav-container">
          <Link href="/login">
            <Box display="flex" alignItems={"center"} gap={"4px"}>
              <Icon w="11px" h="11px" color={textColor} as={FaKey} />
              <Box h="11px">
                <Text fontSize={"10px"} fontWeight={700} color={textColor}>
                  LOG IN{" "}
                </Text>
              </Box>
            </Box>
          </Link>
        </Flex>
      </Flex>
      <Button
        w={"150px"}
        h={"35px"}
        p={"0 8px 0 8px"}
        borderRadius={"35.5px"}
        bg={btnColor}
        bgGradient={btnColor}
        colorScheme={btnColor}
      >
        <Text fontSize={"10px"} fontWeight={700} color={btnTextColor}>
          Free Download
        </Text>
      </Button>
    </Flex>
  );
};
