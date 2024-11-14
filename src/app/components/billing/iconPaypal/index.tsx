"use client";

import { Icon } from "@chakra-ui/react";
import { FC } from "react";
import { FaPaypal } from "react-icons/fa6";

type IconContainerProps = {
  width: number;
  height: number;
  color: string;
};

export const IconPaypal: FC<IconContainerProps> = ({
  width,
  height,
  color,
}) => {
  return (
    <Icon as={FaPaypal} w={`${width}px`} h={`${height}px`} color={color}></Icon>
  );
};
