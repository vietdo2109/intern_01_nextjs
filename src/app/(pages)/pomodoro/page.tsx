"use client";

import { Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import { POMO_COLOR_PALETTE, WHITE_COLOR } from "@/constants/colors";
import { Header } from "@/components/header";
import {
  BrainIcon,
  CoffeeIcon,
  DotsIcon,
  PauseIcon,
  PlayIcon,
  SkipIcon,
} from "@/components/pomodoro/icons";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { SettingModal } from "@/components/pomodoro/settingModal";
import { useUserDTOPomodoroSettings } from "@/components/services/queries";

const montserrat = Montserrat({ subsets: ["latin"] });

type PomoStatus = "focus" | "shortBreak" | "longBreak";

export type Settings = {
  focusLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  pomoUntilLongBreakLength: number;
  autoResumeTime: boolean;
  sound: boolean;
};

export default function Pomodoro() {
  const [status, setStatus] = useState<PomoStatus>("focus");
  const [isStopped, setIsStopped] = useState<boolean>(true);
  const [displayedTime, setDisplayedTime] = useState<{
    minutes: string;
    seconds: string;
  }>({ minutes: "00", seconds: "00" });
  const { data } = useUserDTOPomodoroSettings();
  const [settings, setSettings] = useState<Settings>({
    focusLength: data?.pomodoroSettings.focusLength || 25,
    shortBreakLength: data?.pomodoroSettings.shortBreakLength || 5,
    longBreakLength: data?.pomodoroSettings.longBreakLength || 20,
    pomoUntilLongBreakLength:
      data?.pomodoroSettings.pomoUntilLongBreakLength || 4, // this data will be fetch from database
    autoResumeTime: data?.pomodoroSettings.autoResumeTime || true,
    sound: data?.pomodoroSettings.sound || true,
  });

  const [timeRemaining, setTimeRemaining] = useState<number>(
    settings.focusLength * 60
  ); // initial time in seconds

  const colors =
    status === "focus"
      ? POMO_COLOR_PALETTE.FOCUS
      : status === "shortBreak"
      ? POMO_COLOR_PALETTE.SHORT_BREAK
      : POMO_COLOR_PALETTE.LONG_BREAK;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isStopped) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimerEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStopped]);

  useEffect(() => {
    const formatedTime = formatTime(timeRemaining);
    console.log(timeRemaining);
    setDisplayedTime({
      minutes: formatedTime.minutes,
      seconds: formatedTime.seconds,
    });
  }, [timeRemaining]);

  useEffect(() => {
    if (data) {
      console.log("pomodata", data);
      setSettings({
        focusLength: data?.pomodoroSettings.focusLength,
        shortBreakLength: data?.pomodoroSettings.shortBreakLength,
        longBreakLength: data?.pomodoroSettings.longBreakLength,
        pomoUntilLongBreakLength:
          data?.pomodoroSettings.pomoUntilLongBreakLength,
        autoResumeTime: data?.pomodoroSettings.autoResumeTime,
        sound: data?.pomodoroSettings.sound,
      });
      setTimeRemaining(data.pomodoroSettings.focusLength * 60);
    }
  }, [data]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return { minutes: minutes, seconds: seconds };
  };

  // Handle when the timer ends
  const handleTimerEnd = () => {
    if (!settings.autoResumeTime) {
      setIsStopped(true);
    }
    if (settings.sound) {
      // Play a sound here if enabled
      console.log("Timer ended!");
    }
    handleStatusChange(); // Move to the next status
  };

  // Handle status transitions
  const handleStatusChange = () => {
    if (status === "focus") {
      setStatus("shortBreak");
      setTimeRemaining(settings.shortBreakLength * 60);
    } else if (status === "shortBreak") {
      setStatus("longBreak");
      setTimeRemaining(settings.longBreakLength * 60);
    } else {
      setStatus("focus");
      setTimeRemaining(settings.focusLength * 60);
    }
  };

  return (
    <Flex width="100%" zIndex={1} right={0} flexDir="column">
      <Flex
        className={montserrat.className}
        flex="1"
        width="100%"
        padding="24px"
        minH={"100vh"}
        gap={"24px"}
        flexDir={"column"}
      >
        <Flex>
          <Header theme="dark" page="Pomodoro" />
        </Flex>
        <Flex
          w={"100%"}
          h={"100%"}
          bg={WHITE_COLOR}
          padding={"17.5px"}
          borderRadius={"15px"}
        >
          <Flex
            w={"100%"}
            h={"100%"}
            bg={colors.BG}
            borderRadius={"15px"}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap="24px"
          >
            <Flex
              borderRadius="24px"
              padding="8px 16px"
              alignItems="center"
              mt="24px"
              gap="8px"
              border={`3px solid ${colors.TEXT}`}
              bg={colors.BUTTON_SECONDARY}
            >
              {status === "focus" ? (
                <BrainIcon color={colors.TEXT} />
              ) : (
                <CoffeeIcon color={colors.TEXT} />
              )}
              <Text color={colors.TEXT} fontSize="24px" fontWeight={600}>
                {status === "focus"
                  ? "Focus"
                  : status === "shortBreak"
                  ? "Short break"
                  : "Long break"}
              </Text>
            </Flex>

            <Flex mt="24px" flexDir="column" alignItems="center" gap="32px">
              <Text
                lineHeight="220px"
                fontWeight={isStopped ? 400 : 700}
                fontSize={250}
                color={colors.TEXT}
                textShadow=" 2px 4px 3px rgba(0,0,0,0.3)"
                style={{
                  transition: "transform 0.2s ease, font-weight 0.2s ease",
                  transform: `scale(${isStopped ? 1 : 1.1})`,
                }}
              >
                {displayedTime.minutes}
              </Text>
              <Text
                fontWeight={isStopped ? 400 : 700}
                fontSize={250}
                color={colors.TEXT}
                mt={"0px"}
                lineHeight="220px"
                textShadow=" 2px 4px 3px rgba(0,0,0,0.3)"
                style={{
                  transition: "transform 0.2s ease, font-weight 0.2s ease",
                  transform: `scale(${isStopped ? 1 : 1.1})`,
                }}
              >
                {displayedTime.seconds}
              </Text>
            </Flex>

            <Flex mt="40px" alignItems="center" gap="16px">
              <Button
                onClick={onOpen}
                bg={colors.BUTTON_SECONDARY}
                p="24px 24px"
                width="80px"
                h="80px"
                borderRadius="24px"
                _hover={{
                  bg: `${colors.BUTTON_ON_HOVER}`,
                }}
              >
                <DotsIcon color={colors.TEXT} />
              </Button>
              <Button
                onClick={() => setIsStopped(!isStopped)}
                bg={colors.BUTTON_PRIMARY}
                borderRadius="32px"
                width="128px"
                h="96px"
                _hover={{
                  bg: `${colors.BUTTON_ON_HOVER}`,
                }}
              >
                {!isStopped ? (
                  <PauseIcon color={colors.TEXT} />
                ) : (
                  <PlayIcon color={colors.TEXT} />
                )}
              </Button>

              <Button
                onClick={handleStatusChange}
                bg={colors.BUTTON_SECONDARY}
                p="24px 24px"
                width="80px"
                h="80px"
                borderRadius="24px"
                _hover={{
                  bg: `${colors.BUTTON_ON_HOVER}`,
                }}
              >
                <SkipIcon color={colors.TEXT} />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <SettingModal
        bg={colors.BG}
        textColor={colors.TEXT}
        onClose={onClose}
        isOpen={isOpen}
        settings={settings}
        setSettings={setSettings}
      />
    </Flex>
  );
}
