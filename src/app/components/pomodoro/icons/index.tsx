"use client";
import { PiBrain } from "react-icons/pi";

import { Icon } from "@chakra-ui/react";
import { FiCoffee } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { BsSkipForwardFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

export const BrainIcon = ({ color }: { color: string }) => {
  return <Icon as={PiBrain} color={color} width="32px" height="32px"></Icon>;
};

export const CoffeeIcon = ({ color }: { color: string }) => {
  return <Icon as={FiCoffee} color={color} width="32px" height="32px"></Icon>;
};

export const PlayIcon = ({ color }: { color: string }) => {
  return <Icon as={FaPlay} color={color} width="32px" height="32px"></Icon>;
};

export const PauseIcon = ({ color }: { color: string }) => {
  return <Icon as={FaPause} color={color} width="32px" height="32px"></Icon>;
};

export const SkipIcon = ({ color }: { color: string }) => {
  return (
    <Icon
      as={BsSkipForwardFill}
      color={color}
      width="32px"
      height="32px"
    ></Icon>
  );
};

export const DotsIcon = ({ color }: { color: string }) => {
  return (
    <Icon as={BsThreeDots} color={color} width="32px" height="32px"></Icon>
  );
};
