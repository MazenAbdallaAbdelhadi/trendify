import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ReactNode, useState } from "react";
import { Input } from "../ui/input";

import { UserCircle } from "lucide-react";

type InputFieldProps = {
  label: ReactNode;
  name: string;
};

const InputFile = ({ label, name }: InputFieldProps) => {
  const { control } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>
              <span className="mb-2 block">{label}</span>
              <div>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-[100px] rounded-full m-auto"
                  />
                ) : (
                  <UserCircle size={100} className="max-w-[100px] m-auto" />
                )}
              </div>
            </FormLabel>

            <FormControl>
              <Input
                className="border-dashed"
                accept="image/png, image/jpeg, image/png"
                multiple={false}
                type="file"
                onChange={(e) => {
                  field.onChange(e.target.files ? e.target.files[0] : null);
                  handleFileChange(e); // Call handleFileChange to update image preview
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
