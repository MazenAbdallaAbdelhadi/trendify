import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import React, { PropsWithChildren, ReactNode } from "react";

type InputFieldProps = PropsWithChildren<{
  label: ReactNode;
  name: string;
}>;

const InputField = ({ children, label, name }: InputFieldProps) => {
  const { control } = useFormContext();

  const inputChild = React.isValidElement(children) ? children : null;

  if (!inputChild) {
    throw new Error(
      "InputField component expects a single valid React element as children."
    );
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {React.cloneElement(inputChild, { ...field })}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputField;
