import { Text, Box, Flex, Icon } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import {
  DARK_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  GRAY_TEXT_COLOR,
} from "@/constants/colors";

export default function ProfileInfo() {
  return (
    <Box
      flex={1}
      bg={"#FFFFFF"}
      borderRadius={"15px"}
      shadow="xs"
      px="21px"
      py="28px"
    >
      <Flex flexDir="column" maxH={"700px"} gap="19px">
        <Text fontSize="18ox" fontWeight="700" color={DARK_COLOR}>
          Profile Information
        </Text>
        <Text fontSize="12px" fontWeight="400" color={GRAY_COLOR}>
          Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is
          no. If two equally difficult paths, choose the one more painful in the
          short term (pain avoidance is creating an illusion of equality).
        </Text>
        <Box
          mt="12px"
          h="2px"
          w="100%"
          bgGradient="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)"
          mb="16px"
        ></Box>

        <Flex gap="10px">
          <Text fontSize="12px" fontWeight={700} color={GRAY_TEXT_COLOR}>
            Full Name:
          </Text>
          <Text fontSize="12px" fontWeight={400} color={GRAY_COLOR}>
            Alec M.Thompson
          </Text>
        </Flex>

        <Flex gap="10px">
          <Text fontSize="12px" fontWeight={700} color={GRAY_TEXT_COLOR}>
            Mobile:
          </Text>
          <Text fontSize="12px" fontWeight={400} color={GRAY_COLOR}>
            (44) 123 1234 123
          </Text>
        </Flex>

        <Flex gap="10px">
          <Text fontSize="12px" fontWeight={700} color={GRAY_TEXT_COLOR}>
            Email:
          </Text>
          <Text fontSize="12px" fontWeight={400} color={GRAY_COLOR}>
            alecthompson@mail.com
          </Text>
        </Flex>

        <Flex gap="10px">
          <Text fontSize="12px" fontWeight={700} color={GRAY_TEXT_COLOR}>
            Location:
          </Text>
          <Text fontSize="12px" fontWeight={400} color={GRAY_COLOR}>
            United States
          </Text>
        </Flex>

        <Flex gap="10px" alignItems="center">
          <Text fontSize="12px" fontWeight={700} color={GRAY_TEXT_COLOR}>
            Social Media:
          </Text>
          <Flex gap="15px" pb={"3px"}>
            <Icon
              cursor="pointer"
              as={FaFacebook}
              w="10px"
              h="10px"
              color={GREEN_COLOR}
            ></Icon>
            <Icon
              cursor="pointer"
              as={FaSquareXTwitter}
              w="10px"
              h="10px"
              color={GREEN_COLOR}
            ></Icon>

            <Icon
              cursor="pointer"
              as={FaInstagramSquare}
              w="10px"
              h="10px"
              color={GREEN_COLOR}
            ></Icon>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
