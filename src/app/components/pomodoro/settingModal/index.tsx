import React, { Dispatch, FC, SetStateAction } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  ModalHeader,
  ModalCloseButton,
  Text,
  Switch,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Settings } from "@/(pages)/pomodoro/page";
import { useEditPomodoroSettings } from "@/services/mutations";
type SettingModalProps = {
  bg: string;
  textColor: string;
  onClose: () => void;
  isOpen: boolean;
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
};
export const SettingModal: FC<SettingModalProps> = ({
  bg,
  textColor,
  onClose,
  isOpen,
  settings,
  setSettings,
}) => {
  const theme = extendTheme({
    colors: {
      brand: {
        500: textColor,
      },
    },
  });
  const editPomoSettings = useEditPomodoroSettings();
  return (
    <ChakraProvider theme={theme}>
      <Modal
        onClose={onClose}
        size="lg"
        isOpen={isOpen}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent bg={bg} borderRadius="16px" color={textColor}>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex
              p="24px"
              width="100%"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              gap="32px"
            >
              {/* focus length setting */}
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text flex={1} fontSize="16px">
                  Focus length
                </Text>

                <NumberInput
                  min={1}
                  max={60}
                  onChange={(valueString) => {
                    const value = parseInt(valueString, 10); // Convert the string to a number
                    if (!isNaN(value)) {
                      // Ensure it's a valid number
                      editPomoSettings.mutate({
                        ...settings,
                        focusLength: value,
                      });
                      setSettings({ ...settings, focusLength: value });
                    }
                  }}
                  defaultValue={settings.focusLength}
                  width="80px"
                  size="md"
                  borderColor={textColor}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      color={textColor}
                      borderColor={textColor}
                    />
                    <NumberDecrementStepper
                      color={textColor}
                      borderColor={textColor}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              {/* focus length setting end */}
              {/* short break length setting */}
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text flex={1} fontSize="16px">
                  Short break length
                </Text>

                <NumberInput
                  min={1}
                  max={60}
                  onChange={(valueString) => {
                    const value = parseInt(valueString, 10); // Convert the string to a number
                    if (!isNaN(value)) {
                      // Ensure it's a valid number
                      setSettings({ ...settings, shortBreakLength: value });
                    }
                  }}
                  defaultValue={settings.shortBreakLength}
                  width="80px"
                  size="md"
                  borderColor={textColor}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      color={textColor}
                      borderColor={textColor}
                    />
                    <NumberDecrementStepper
                      color={textColor}
                      borderColor={textColor}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              {/* short break length setting end*/}
              {/* long break length setting */}
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text flex={1} fontSize="16px">
                  Long break length
                </Text>

                <NumberInput
                  min={1}
                  max={60}
                  onChange={(valueString) => {
                    const value = parseInt(valueString, 10); // Convert the string to a number
                    if (!isNaN(value)) {
                      // Ensure it's a valid number
                      setSettings({ ...settings, longBreakLength: value });
                    }
                  }}
                  defaultValue={settings.longBreakLength}
                  width="80px"
                  size="md"
                  borderColor={textColor}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      color={textColor}
                      borderColor={textColor}
                    />
                    <NumberDecrementStepper
                      color={textColor}
                      borderColor={textColor}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              {/* long break length setting end*/}
              {/* pomodoros until long break setting */}
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text flex={1} fontSize="16px">
                  Pomodoros until long break{" "}
                </Text>

                <NumberInput
                  min={1}
                  max={60}
                  onChange={(valueString) => {
                    const value = parseInt(valueString, 10); // Convert the string to a number
                    if (!isNaN(value)) {
                      // Ensure it's a valid number
                      setSettings({
                        ...settings,
                        pomoUntilLongBreakLength: value,
                      });
                    }
                  }}
                  defaultValue={settings.pomoUntilLongBreakLength}
                  width="80px"
                  size="md"
                  borderColor={textColor}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      color={textColor}
                      borderColor={textColor}
                    />
                    <NumberDecrementStepper
                      color={textColor}
                      borderColor={textColor}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              {/* pomodoros until long break setting end */}
              {/* Auto resume timer setting */}
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text flex={1} fontSize="16px">
                  Auto resume timer
                </Text>
                <Switch
                  size="lg"
                  colorScheme="brand"
                  onChange={() => {
                    // Ensure it's a valid number
                    setSettings({
                      ...settings,
                      autoResumeTime: !settings.autoResumeTime,
                    });
                  }}
                  isChecked={settings.autoResumeTime ? true : false}
                />
              </Flex>
              {/* Auto resume timer setting end */}
              {/* Sound setting */}
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text flex={1} fontSize="16px">
                  Sound
                </Text>
                <Switch
                  size="lg"
                  colorScheme="brand"
                  onChange={() => {
                    // Ensure it's a valid number
                    setSettings({ ...settings, sound: !settings.sound });
                  }}
                  isChecked={settings.sound ? true : false}
                />
              </Flex>{" "}
              {/* Sound setting */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};
