import { CheckboxGroup, Stack, Checkbox } from "@chakra-ui/react";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../types/mediumForm/option";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
};

export default function RHFSkillSelector<T extends FieldValues>({
  name,
  options,
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <CheckboxGroup {...field} colorScheme="gray">
          <Stack borderRadius={"6px"} spacing={[1, 5]} direction={["column"]}>
            {options?.map((option) => (
              <Checkbox value={option.id} key={option.id}>
                {option.label}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      )}
    ></Controller>
  );
}
