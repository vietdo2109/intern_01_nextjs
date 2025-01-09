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
  Button,
} from "@chakra-ui/react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Author, authorSchema } from "@/lib/models/author";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { AuthorFromDB } from "@/lib/models/author";
import { DevTool } from "@hookform/devtools";
import {
  GRAY_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from "@/constants/colors";
import AuthorDeleteModal from "./authorDeleteModal";
import { IoIosImage } from "react-icons/io";
import { useRef } from "react";
import { IoIosImages } from "react-icons/io";
import SeeImageModal from "./seeImageModal";
import { useDeleteAuthor, useEditAuthor } from "@/services/mutations";
import { useRouter } from "next/navigation";

const defaultAvatar = "/images/defaultAvatar.jpg";

type AuthorFormProps = {
  id: number;
  author: AuthorFromDB;
};

export const EditAuthorForm: FC<AuthorFormProps> = ({ id, author }) => {
  // handle date formatting
  const employedDate = new Date(author.employeddate); // Date from the database
  const formattedDate = employedDate.toISOString().split("T")[0]; // Formats to "2021-06-14"

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<Author>({
    resolver: yupResolver(authorSchema),
    defaultValues: {
      ...author,
    },
  });

  // -----UPDATE FUNCTION-----
  const editAuthor = useEditAuthor();
  const deleteAuthor = useDeleteAuthor();
  const router = useRouter();
  useEffect(() => {
    if (
      (isSubmitSuccessful && editAuthor.isSuccess) ||
      deleteAuthor.isSuccess
    ) {
      router.push("/tables");
    }
  }, [
    isSubmitSuccessful,
    editAuthor.isSuccess,
    deleteAuthor.isSuccess,
    router,
  ]);
  // -----END UPDATE FUNCTION-----

  // -----FORM-----
  const onSubmit = (data: Author) => {
    console.log(errors);
    const {
      avatar,
      fullName: fullname,
      email,
      function1,
      function2,
      status,
      employedDate: employeddate,
    } = data;

    editAuthor.mutate({
      avatar: avatar + "",
      fullname,
      email,
      function1,
      function2,
      status,
      employeddate,
      id,
    });
  };
  // -----END FORM-----

  // -----MODAL-----
  const {
    isOpen: isSeeImageModalOpen,
    onOpen: onSeeImageModalOpen,
    onClose: onSeeImageModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteAuthorModalOpen,
    onOpen: onDeleteAuthorModalOpen,
    onClose: onDeleteAuthorModalClose,
  } = useDisclosure();
  // -----END MODAL-----

  // -----AVATAR-----
  const avatarSrc = useWatch({
    control,
    name: "avatar",
    defaultValue: author.avatar,
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
  // -----END AVATAR-----

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
                  type="button"
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
                  type="button"
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
              }}
            ></Flex>
          </Flex>

          <Input
            defaultValue={author.fullname}
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
          defaultValue={author.email}
          {...register("email")}
          mb="20px"
        />

        <label htmlFor="function1">
          <Text fontWeight={700}>Function1: </Text>
        </label>
        <Input
          id="function1"
          mb="20px"
          defaultValue={author.function1}
          {...register("function1")}
        />

        <label htmlFor="function2">
          <Text fontWeight={700}>Function2: </Text>
        </label>
        <Input
          id="function2"
          mb="20px"
          defaultValue={author.function2}
          {...register("function2")}
        />

        <label htmlFor="status">
          <Text fontWeight={700}>Status: </Text>
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <RadioGroup defaultValue={author.status} mb="20px" {...field}>
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
            isLoading={deleteAuthor.isPending}
            bg={RED_COLOR}
            color={WHITE_COLOR}
            onClick={onDeleteAuthorModalOpen}
          >
            DELETE
          </Button>

          <Button
            isLoading={editAuthor.isPending}
            bg={GREEN_COLOR}
            color={WHITE_COLOR}
            type="submit"
          >
            CONFIRM
          </Button>
        </Flex>
      </Flex>
      <AuthorDeleteModal
        isOpen={isDeleteAuthorModalOpen}
        onClose={onDeleteAuthorModalClose}
        handleDelete={() => {
          deleteAuthor.mutate(id);
          onDeleteAuthorModalClose();
        }}
      />
      <SeeImageModal
        image={author.avatar || defaultAvatar}
        isOpen={isSeeImageModalOpen}
        onClose={onSeeImageModalClose}
      />
      <DevTool control={control} />
    </form>
  );
};
