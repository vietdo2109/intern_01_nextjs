"use client";

import { FaExclamation } from "react-icons/fa6";
import { Icon } from "@chakra-ui/react";
import { GRAY_COLOR } from "@/constants/colors";
export default function Exclaimation() {
  return <Icon as={FaExclamation} color={GRAY_COLOR}></Icon>;
}
