import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AlertCircle } from "lucide-react";

import { useRegisterMutation } from "@/services/api/auth";
import { registerSchema } from "@/lib/schema/auth";
import { extractError } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import InputField from "../form/input-field";
import InputFile from "../form/input-file";

const RegisterForm = () => {
  // 1- register mutaion
  const { mutate, isPending, isError, error, isSuccess } =
    useRegisterMutation();

  // 2- register form
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: undefined,
      profileImage: new File([], ""),
    },
  });

  // 3- send register data to server
  const handleRegister = (data: z.infer<typeof registerSchema>) => {
    console.log("data form REGISTER_FORM: ", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.bio) formData.append("bio", data.bio);

    if (data.profileImage) formData.append("profileImage", data.profileImage);

    mutate(formData);
  };

  // 4- onSuccess redirect to home / or the page where user came from
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isSuccess) {
      navigate(from, { replace: true });
    }
  }, [isSuccess, navigate, from]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
        {/* error alert */}
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>ERROR</AlertTitle>
            <AlertDescription>{extractError(error).msg}</AlertDescription>
          </Alert>
        )}

        <InputField name="name" label="Name">
          <Input placeholder="user@example.com" />
        </InputField>

        <InputField name="email" label="Email">
          <Input placeholder="user@example.com" />
        </InputField>

        <InputField name="password" label="Password">
          <Input placeholder="**********" />
        </InputField>

        <InputField name="bio" label="Bio">
          <Input placeholder="something about you." />
        </InputField>

        {/*TODO ADD PROFILE IMAGE PREVIEW */}
        <InputFile label="Profile Image" name="profileImage" />

        <Button type="submit" disabled={isPending}>
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
