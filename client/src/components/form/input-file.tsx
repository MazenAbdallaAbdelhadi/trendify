import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ReactNode } from "react";
import { Input } from "../ui/input";

type InputFieldProps = {
  label: ReactNode;
  name: string;
};

const InputFile = ({ label, name }: InputFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                accept="image/png, image/jpeg, image/png"
                multiple={false}
                type="file"
                onChange={(e) => {
                  field.onChange(e.target.files ? e.target.files[0] : null);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputFile;
