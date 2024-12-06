"use client";

import { Icon } from "@chakra-ui/react";
import { FC } from "react";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

type IconContainerProps = {
  width: number;
  height: number;
  color: string;
};

export const IconPencil: FC<IconContainerProps> = ({
  width,
  height,
  color,
}) => {
  return (
    <Icon as={LuPencil} w={`${width}px`} h={`${height}px`} color={color}></Icon>
  );
};

export const IconDelete: FC<IconContainerProps> = ({
  width,
  height,
  color,
}) => {
  return (
    <Icon
      as={FaRegTrashAlt}
      w={`${width}px`}
      h={`${height}px`}
      color={color}
    ></Icon>
  );
};
