"use client";

import { Icon } from "@chakra-ui/react";
import { FC } from "react";
import { RiPencilFill } from "react-icons/ri";

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
    <Icon
      as={RiPencilFill}
      w={`${width}px`}
      h={`${height}px`}
      color={color}
    ></Icon>
  );
};
