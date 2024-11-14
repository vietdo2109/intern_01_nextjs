"use client";
import {
  Flex,
  Icon,
  Input,
  Text,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Author, authorSchema } from "@/lib/models/author";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { DevTool } from "@hookform/devtools";
import {
  GRAY_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from "@/constants/colors";
import { IoIosImage } from "react-icons/io";
import { useRef } from "react";
import { IoIosImages } from "react-icons/io";
import SeeImageModal from "../editAuthorForm/seeImageModal";
import { redirect } from "next/navigation";
const defaultAvatar = "/images/defaultAvatar.jpg";

export const AddAuthorForm = () => {
  const onSubmit = (data: Author) => {
    console.log("is loading: " + isLoading);
    console.log("is submitting: " + isSubmitting);
    console.log("is validating: " + isValidating);
    console.log("error: " + errors);
    addAuthor(data);
  };

  const employedDate = new Date();
  const formattedDate = employedDate.toISOString().split("T")[0]; // Formats to "2021-06-14"

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, errors, isSubmitting, isValidating, isLoading },
    control,
  } = useForm<Author>({
    resolver: yupResolver(authorSchema),
    defaultValues: {
      avatar: "",
      fullName: "",
      email: "",
      function1: "",
      function2: "",
      status: "Online",
      employedDate: new Date(),
    },
  });

  const {
    isOpen: isSeeImageModalOpen,
    onOpen: onSeeImageModalOpen,
    onClose: onSeeImageModalClose,
  } = useDisclosure();

  const toast = useToast();

  const addAuthor = async (formData: Author) => {
    console.log(formData);
    try {
      const response = await fetch(`/api/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add author data");
      }

      const data = await response.json();

      console.log("Author updated successfully:", data);
      toast({
        position: "bottom-right",

        title: "Author's profile added",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding author:", error);
      toast({
        position: "bottom-right",

        title: "Failed to update",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      // Optional: display error message
    }
  };

  const avatarSrc = useWatch({
    control,
    name: "avatar",
  });
  const [isAvtMenuDisplayed, setIsAvtMenuDisplayed] = useState(false);

  const handleSeeImage = () => {
    onSeeImageModalOpen();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = (await convertBase64(file)) as string;
      setValue("avatar", base64); // Update avatar field with base64 string
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result); // Base64 string of the image
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap="10px">
        <Flex
          width="100%"
          justifyContent="center"
          flexDir="column"
          alignItems="center"
          gap="24px"
          mb="20px"
          position="relative"
        >
          <Flex
            bg={GRAY_COLOR}
            width="160px"
            height="160px"
            borderRadius="50%"
            position="relative"
          >
            <img
              src={avatarSrc ? avatarSrc + "" : defaultAvatar}
              alt="avatar"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                backgroundPosition: "center",
                borderRadius: "50%",
              }}
            />
            <Flex
              marginLeft="30px"
              width="260px"
              h="100px"
              border="1px solid lightgray"
              borderRadius="10px"
              display={isAvtMenuDisplayed ? "" : "none"}
              shadow="md"
              flexDir="column"
              justifyContent="space-between"
              padding="10px"
              position="absolute"
              right="-300px"
              top="0"
            >
              <Flex
                paddingY="7px"
                paddingX={"10px"}
                borderRadius={"10px"}
                _hover={{ bg: "#f1f1f1" }}
                gap="8px"
                alignItems={"center"}
              >
                <Icon as={IoIosImage} width="20px"></Icon>

                <button
                  onClick={handleSeeImage}
                  style={{ width: "100%", height: "100%", textAlign: "left" }}
                >
                  <Text fontWeight="700">See image</Text>
                </button>
              </Flex>

              <Flex
                paddingY="7px"
                paddingX={"10px"}
                borderRadius={"10px"}
                _hover={{ bg: "#f1f1f1" }}
                gap="8px"
                alignItems={"center"}
              >
                <Icon as={IoIosImages} width="20px"></Icon>
                <button
                  onClick={handleButtonClick}
                  style={{ width: "100%", height: "100%", textAlign: "left" }}
                >
                  <Text fontWeight="700">Upload image</Text>
                </button>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  {...register("avatar")}
                  style={{ display: "none" }}
                />
              </Flex>
            </Flex>
            <Flex
              position="absolute"
              bg={WHITE_COLOR}
              width="100%"
              height="100%"
              borderRadius="50%"
              opacity="0%"
              _hover={{ opacity: "30%" }}
              onClick={() => {
                setIsAvtMenuDisplayed(!isAvtMenuDisplayed);
                console.log(isAvtMenuDisplayed);
              }}
            ></Flex>
          </Flex>

          <Input
            placeholder="e.g. Nobi Nobita"
            {...register("fullName")}
            width="30%"
            textAlign="center"
            fontWeight="700"
          />
        </Flex>

        <label htmlFor="email">
          <Text fontWeight={700}>Email address: </Text>
        </label>
        <Input
          id="email"
          {...register("email")}
          placeholder="abc@gmail.com"
          mb="20px"
        />

        <label htmlFor="function1">
          <Text fontWeight={700}>Function1: </Text>
        </label>
        <Input
          id="function1"
          mb="20px"
          placeholder="Developer"
          {...register("function1")}
        />

        <label htmlFor="function2">
          <Text fontWeight={700}>Function2: </Text>
        </label>
        <Input
          id="function2"
          mb="20px"
          placeholder="Designer"
          {...register("function2")}
        />

        <label htmlFor="status">
          <Text fontWeight={700}>Status: </Text>
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <RadioGroup defaultValue="Online" mb="20px" {...field}>
              <Stack spacing={5} direction="row">
                <Radio colorScheme="green" value="Online">
                  Online
                </Radio>
                <Radio colorScheme="red" value="Offline">
                  Offline
                </Radio>
              </Stack>
            </RadioGroup>
          )}
        />
        <label htmlFor="employedDate">
          <Text fontWeight={700}>Employed date: </Text>
        </label>

        <Input
          id="employedDate"
          defaultValue={formattedDate}
          type="date"
          {...register("employedDate")}
          mb="40px"
        />

        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        <Flex gap="20px">
          <Button
            isLoading={isSubmitting}
            bg={GREEN_COLOR}
            color={WHITE_COLOR}
            type="submit"
          >
            CONFIRM
          </Button>
        </Flex>
      </Flex>

      <SeeImageModal
        image={avatarSrc ? avatarSrc + "" : defaultAvatar}
        isOpen={isSeeImageModalOpen}
        onClose={onSeeImageModalClose}
      />
      <DevTool control={control} />
    </form>
  );
};
