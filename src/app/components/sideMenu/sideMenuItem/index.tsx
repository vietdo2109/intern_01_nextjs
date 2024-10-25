"use client";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { SideMenuItem } from "./sideMenuItems";
import { usePathname } from "next/navigation";

import { GREEN_COLOR, DARK_COLOR, WHITE_COLOR } from "@/constants/colors";
import { FC } from "react";
import Link from "next/link";
export const MenuItem: FC<SideMenuItem> = ({ title, icon, url }) => {
  const pathname = usePathname();

  return (
    <Link
      key={title}
      style={{
        width: "100%",
      }}
      href={url}
    >
      {
        <Flex w="100%" flexDir="column">
          <Box
            display="flex"
            alignItems={"center"}
            w="100%"
            gap={"12px"}
            padding="12px"
            borderRadius="15px"
            className="nav-container"
            bg={pathname === url ? WHITE_COLOR : ""}
          >
            <Box
              display="flex"
              h="30px"
              w="30px"
              alignItems={"center"}
              justifyContent={"center"}
              bg={pathname === url ? GREEN_COLOR : WHITE_COLOR}
              borderRadius="12px"
            >
              <Icon
                w="15px"
                h="15px"
                as={icon}
                color={pathname === url ? WHITE_COLOR : GREEN_COLOR}
              />
            </Box>

            <Box>
              <Text fontSize={"12px"} fontWeight={700} color={DARK_COLOR}>
                {title}
              </Text>
            </Box>
          </Box>
        </Flex>
      }
    </Link>
  );
};
