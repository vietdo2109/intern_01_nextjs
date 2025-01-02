"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Input,
  FormControl,
  FormLabel,
  Switch,
  useToast,
} from "@chakra-ui/react";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import { TopNavBar } from "@/components/topNavBar";
import { Footer } from "@/components/footer";
import ErrorMess from "@/components/forms/ErrorMess";
import { DARK_COLOR } from "@/constants/colors";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/actions/auth";

export default function SignUp() {
  const [state, action] = useFormState(signup, undefined);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const toast = useToast();

  useEffect(() => {
    if (state?.message == "Account created successfully!") {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        position: "bottom-right",
        duration: 9000,
        isClosable: true,
      });
      setFormData({
        username: "",
        email: "",
        password: "",
        repeat_password: "",
      });
      state.message = "";
    } else if (
      state?.message ===
      "This email is already in use. Please use a different email."
    ) {
      toast({
        title: "This email is already in use. Please use a different email.",

        status: "error",
        position: "bottom-right",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [state, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex
      as="nav"
      p={"10px"}
      w={"100%"}
      justifyContent={"center"}
      h={"100vh"}
      mb={"20px"}
    >
      <Flex
        w={"100%"}
        alignItems="center"
        borderRadius={"15px"}
        height={"50%"}
        p="30px"
        position={"relative"}
        flexDirection={"column"}
      >
        <Image
          width={1872}
          height={521}
          unoptimized={true}
          src="/images/signUpBg.png"
          alt="sign up bg"
          style={{
            position: "absolute",
            minHeight: "50vh",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            zIndex: -1,
            left: 0,
            right: 0,
            margin: "0 auto",

            marginTop: "-15px",

            borderRadius: "15px",
            backgroundSize: "cover",
          }}
        />
        <TopNavBar
          shadow={false}
          logoColor="white"
          textColor="#FFFFFF"
          BG_COLOR="none"
          btnColor="#FFFFFF"
          btnTextColor="#313860"
        />

        <Flex
          justifyContent="center"
          mt="60px"
          flexDir={"column"}
          w="333px"
          alignItems="center"
          gap="10px"
        >
          <Box>
            <Text fontSize="32px" fontWeight="700" color="white">
              Welcome!
            </Text>
          </Box>
          <Box>
            <Text
              fontSize="14px"
              fontWeight="400"
              color="white"
              textAlign="center"
            >
              Use these awesome forms to login or create new account in your
              project for free.
            </Text>
          </Box>
        </Flex>

        {/* card */}

        <form action={action} id="create-use-form">
          <Flex
            mt="60px"
            alignItems="center"
            justifyContent="center"
            mb="60px"
            minHeight="915px"
            minWidth="400px"
            width="450px"
            borderRadius="15px"
            bg="#FFFFFF"
            boxShadow="lg"
            flexDirection="column"
          >
            {/* card header */}
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Text
                fontFamily={"Helvetica"}
                fontWeight="700"
                fontSize="18px"
                color="#2D3748"
              >
                Register with
              </Text>
              <Flex minW="255px" gap="15px" p="25px">
                <Flex
                  w="75px"
                  h="75px"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #E2E8F0"
                  borderRadius="15px"
                  cursor="pointer"
                  transition="all .25s ease"
                  _hover={{ filter: "brightness(110%)", bg: "#4FD1C5" }}
                >
                  <Link href={"/"}>
                    <Icon
                      w="26px"
                      h="26px"
                      color={DARK_COLOR}
                      mt="5px"
                      as={FaFacebook}
                    ></Icon>
                  </Link>
                </Flex>
                <Flex
                  w="75px"
                  h="75px"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #E2E8F0"
                  borderRadius="15px"
                  cursor="pointer"
                  transition="all .25s ease"
                  _hover={{ filter: "brightness(110%)", bg: "#4FD1C5" }}
                >
                  <Link href={"/"}>
                    <Icon
                      w="31px"
                      h="31px"
                      color={DARK_COLOR}
                      as={FaApple}
                    ></Icon>
                  </Link>
                </Flex>
                <Flex
                  w="75px"
                  h="75px"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #E2E8F0"
                  borderRadius="15px"
                  cursor="pointer"
                  transition="all .25s ease"
                  _hover={{ filter: "brightness(110%)", bg: "#4FD1C5" }}
                >
                  <Link href={"/"}>
                    <Icon
                      w="24px"
                      h="24px"
                      mt="5px"
                      color={DARK_COLOR}
                      as={FaGoogle}
                    ></Icon>
                  </Link>
                </Flex>
              </Flex>
              <Text fontSize="18px" fontWeight={700} color="#A0AEC0">
                or
              </Text>
            </Flex>

            {/* inputs container */}
            <Flex flexDir={"column"} gap="26px" mt="10px">
              <Box>
                <Text fontSize="14px" color={DARK_COLOR} ml="5px">
                  Name
                </Text>
                <Input
                  width="350px"
                  height="50px"
                  border={
                    state?.errors?.username
                      ? "2px solid red"
                      : "2px solid #E2E8F0"
                  }
                  borderRadius="15px"
                  mt="4px"
                  id="username"
                  name="username"
                  placeholder="Your full name"
                  _placeholder={{ fontSize: "14px", color: "#A0AEC0" }}
                  p="0 20px 0 20px"
                  size="sm"
                  value={formData.username}
                  onChange={handleChange}
                />
                <ErrorMess error={state?.errors?.username} />
              </Box>
              <Box>
                <Text fontSize="14px" color={DARK_COLOR} ml="5px">
                  Email
                </Text>
                <Input
                  width="350px"
                  height="50px"
                  border={
                    state?.errors?.email ||
                    state?.message ===
                      "This email is already in use. Please use a different email."
                      ? "2px solid red"
                      : "2px solid #E2E8F0"
                  }
                  borderRadius="15px"
                  mt="4px"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  _placeholder={{ fontSize: "14px", color: "#A0AEC0" }}
                  size="sm"
                  p="0 20px 0 20px"
                  value={formData.email}
                  onChange={handleChange}
                />
                <ErrorMess error={state?.errors?.email} />
              </Box>
              <Box>
                <Text fontSize="14px" color={DARK_COLOR} ml="5px">
                  Password
                </Text>
                <Input
                  type="password"
                  width="350px"
                  height="50px"
                  border={
                    state?.errors?.password
                      ? "2px solid red"
                      : "2px solid #E2E8F0"
                  }
                  borderRadius="15px"
                  mt="4px"
                  id="password"
                  name="password"
                  placeholder="Your password"
                  _placeholder={{ fontSize: "14px", color: "#A0AEC0" }}
                  size="sm"
                  p="0 20px 0 20px"
                  value={formData.password}
                  onChange={handleChange}
                />{" "}
                {state?.errors?.password && (
                  <ul>
                    {state?.errors?.password?.map((error, index) => (
                      <ErrorMess key={index} error={error} />
                    ))}
                  </ul>
                )}
              </Box>
              <Box>
                <Text fontSize="14px" color={DARK_COLOR} ml="5px">
                  Re-enter your password
                </Text>
                <Input
                  width="350px"
                  type="password"
                  height="50px"
                  border={
                    state?.errors?.repeat_password
                      ? "2px solid red"
                      : "2px solid #E2E8F0"
                  }
                  borderRadius="15px"
                  mt="4px"
                  id="repeat_password"
                  name="repeat_password"
                  placeholder="re-enter your password"
                  _placeholder={{ fontSize: "14px", color: "#A0AEC0" }}
                  size="sm"
                  p="0 20px 0 20px"
                  value={formData.repeat_password}
                  onChange={handleChange}
                />{" "}
                <ErrorMess error={state?.errors?.repeat_password} />
              </Box>
              <FormControl display="flex" alignItems="center" gap="10px">
                <Switch id="rememer-me-switch" colorScheme="teal" />
                <FormLabel
                  htmlFor="rememer-me-switch"
                  mb="0"
                  fontSize="12px"
                  color="#2D3748"
                >
                  Remember me
                </FormLabel>
              </FormControl>

              <SubmitButton />
            </Flex>
            <Flex padding={"15px"} alignItems={"center"} gap={"3px"}>
              <Text color="#A0AEC0" fontSize="14px" fontWeight="700">
                Already have an account? {"  "}
              </Text>{" "}
              <Text
                color="#4FD1C5"
                cursor="pointer"
                textDecor="none"
                fontSize="14px"
                fontWeight="700"
              >
                <Link href={"/login"}> Log in</Link>
              </Text>
            </Flex>
          </Flex>
        </form>
        <Box w={"60%"}>
          <Footer />
        </Box>
      </Flex>
    </Flex>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      bg={"#4FD1C5"}
      size="lg"
      borderRadius="12px"
      mt="14px"
      isLoading={pending}
      width={"100%"}
      minH="45px"
      type="submit"
    >
      <Text color="#FFFFFF" fontSize="10px" fontWeight={"800"}>
        SIGN UP
      </Text>
    </Button>
  );
}
