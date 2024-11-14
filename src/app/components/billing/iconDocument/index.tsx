"use client";

import { Icon } from "@chakra-ui/react";
import { IoDocumentText } from "react-icons/io5";
import { DARK_COLOR } from "@/constants/colors";

export const IconDocument = () => {
  return <Icon as={IoDocumentText} color={DARK_COLOR} mb={"4px"}></Icon>;
};
