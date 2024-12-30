"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { TopNavBar } from "@/components/topNavBar";
import { Footer } from "@/components/footer";
import { GRAY_TEXT_COLOR } from "@/constants/colors";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect, Suspense, Dispatch, SetStateAction } from "react";
import ErrorMess from "@/components/forms/ErrorMess";
import { login } from "@/actions/auth";
import { redirect, useSearchParams } from "next/navigation";

export default function Login() {
  const [state, action] = useFormState(login, undefined);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const [unauthenticatedMessage, setUnauthenticatedMessage] = useState("");

  useEffect(() => {
    if (state?.message == "Log in successfully!") {
      setFormData({
        email: "",
        password: "",
      });
      state.message = "";
      // console.log("user dto: todo ids: " + state);
      redirect("/todolistnext");
    } else if (state?.message == "Incorrect email or password") {
      toast({
        title: "Incorrect email or password!",
        status: "error",
        position: "bottom-right",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [state, toast]);

  // useEffect(() => {
  //   if (unauthenticated.get("message") == "unauthenticated") {
  //     toast({
  //       title: "You need to login first",
  //       status: "error",
  //       position: "bottom-right",
  //       isClosable: true,
  //     });
  //   }
  // }, [unauthenticated, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex as="nav" w={"100%"} justifyContent={"center"} h={"100vh"}>
      <Suspense fallback={<div>Loading...</div>}>
        <UnauthenticatedWarning
          setUnauthenticatedMessage={setUnauthenticatedMessage}
        />
      </Suspense>
      <Box
        display={{ base: "none", md: "block" }}
        overflowX="hidden"
        h="80%"
        w="44vw"
        position="absolute"
        right="0px"
      >
        <Image
          src="/images/signInBg.png"
          alt="log in image"
          width={970}
          height={950}
          style={{
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "100%",
            position: "absolute",
            borderBottomLeftRadius: "20px",
          }}
          unoptimized={true}
        />
      </Box>
      <Flex
        w={"100%"}
        alignItems="center"
        h="100%"
        p="30px"
        pt="40px"
        position={"relative"}
        flexDirection={"column"}
        justifyContent="space-between"
      >
        <TopNavBar
          logoColor="black"
          textColor="#2D3748"
          BG_COLOR="linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)"
          btnColor="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          btnTextColor="#FFFFFF"
          shadow={true}
        />

        {/* Display unauthenticated message if present */}
        {unauthenticatedMessage && (
          <Text color="red.500" fontSize="14px" fontWeight="700">
            {unauthenticatedMessage}
          </Text>
        )}
        {/* inputs */}
        <Flex minW="800px" width="100%" justifyContent="center">
          <Flex
            h="50vh"
            minH="400px"
            minW="800px"
            width="60%"
            justifySelf="left"
            justifyContent="left"
          >
            <Flex
              flexDir={"column"}
              gap="26px"
              mt="10px"
              justifyContent="space-between"
            >
              <Box>
                <Text fontSize="32px" fontWeight="700" color="#4FD1C5">
                  Welcome Back
                </Text>
                <Text fontSize="14px" fontWeight="700" color="#A0AEC0">
                  Enter your email and password to sign in
                </Text>
              </Box>

              <form action={action}>
                <Flex flexDir={"column"} gap={"24px"}>
                  <Flex flexDir={"column"}>
                    <Text
                      fontSize="14px"
                      color={GRAY_TEXT_COLOR}
                      fontWeight={700}
                      ml="5px"
                    >
                      Email
                    </Text>
                    <Input
                      width="350px"
                      height="50px"
                      border={
                        state?.errors?.email ||
                        state?.message == "Incorrect email or password"
                          ? "1px solid red"
                          : "1px solid #E2E8F0"
                      }
                      borderRadius="15px"
                      mt="4px"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      _placeholder={{ fontSize: "14px", color: "#A0AEC0" }}
                      size="sm"
                      p="0 20px 0 20px"
                    />
                    <ErrorMess error={state?.errors?.email} />
                  </Flex>
                  <Flex flexDir={"column"}>
                    <Text
                      fontSize="14px"
                      color={GRAY_TEXT_COLOR}
                      fontWeight={700}
                      ml="5px"
                    >
                      Password
                    </Text>
                    <Input
                      border={
                        state?.errors?.password ||
                        state?.message == "Incorrect email or password"
                          ? "1px solid red"
                          : "1px solid #E2E8F0"
                      }
                      width="350px"
                      height="50px"
                      borderRadius="15px"
                      mt="4px"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Your password"
                      _placeholder={{ fontSize: "14px", color: "#A0AEC0" }}
                      size="sm"
                      p="0 20px 0 20px"
                    />
                    <ErrorMess error={state?.errors?.password} />
                  </Flex>
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
              </form>

              <Flex
                padding={"15px"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"3px"}
              >
                <Text color="#A0AEC0" fontSize="14px" fontWeight="700">
                  Do not have an account? {"  "}
                </Text>{" "}
                <Text
                  color="#4FD1C5"
                  cursor="pointer"
                  textDecor="none"
                  fontSize="14px"
                  fontWeight="700"
                >
                  <Link href={"/signup"}> Sign up</Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Box w={"60%"}>
          <Footer />
        </Box>
      </Flex>
    </Flex>
  );
}

function UnauthenticatedWarning({
  setUnauthenticatedMessage,
}: {
  setUnauthenticatedMessage: Dispatch<SetStateAction<string>>;
}) {
  const unauthenticated = useSearchParams();

  useEffect(() => {
    if (unauthenticated.get("message") === "unauthenticated") {
      setUnauthenticatedMessage("You need to log in first");
    }
  }, [unauthenticated, setUnauthenticatedMessage]);

  return null;
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
        LOG IN
      </Text>
    </Button>
  );
}
