"use client";

import { Icon } from "@chakra-ui/react";
import { FC } from "react";
import { IoWallet } from "react-icons/io5";

type IconContainerProps = {
  width: number;
  height: number;
  color: string;
};

export const IconWallet: FC<IconContainerProps> = ({
  width,
  height,
  color,
}) => {
  return (
    <Icon as={IoWallet} w={`${width}px`} h={`${height}px`} color={color}></Icon>
  );
};
