import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { useRegisterMutation } from "@/services/api/auth";
import { registerSchema } from "@/lib/schema/auth";
import { extractError } from "@/lib/utils";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
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

  // 5- alert errors
  useEffect(() => {
    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = extractError<any>(error);
      if (e.data && e.data instanceof Array)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        e.data.forEach((fieldError: any) => {
          if (fieldError.msg) {
            form.setError(
              "root.server_error",
              {
                type: "server side",
                message: fieldError.msg,
              },
              { shouldFocus: true }
            );
            toast.error(fieldError.msg, { closeButton: true });
          }
        });
    }
  }, [isError, error, form]);

  // 7- if there is dublicated email error clear it on field change
  const check = form.watch("email");
  useEffect(() => {
    form.clearErrors("root.server_error");
  }, [check, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4 ">
        <InputFile label="Profile Image" name="profileImage" />

        <InputField name="name" label="Name *">
          <Input placeholder="John Doe" />
        </InputField>

        <InputField name="email" label="Email *">
          <Input placeholder="user@example.com" />
        </InputField>
        <span className="text-sm text-destructive font-medium">
          {form.formState.errors?.root?.server_error?.message}
        </span>

        <InputField name="password" label="Password *">
          <Input placeholder="**********" type="password" autoComplete="on" />
        </InputField>

        <InputField name="bio" label="Bio">
          <Textarea
            placeholder="something about you."
            className="resize-none"
          />
        </InputField>

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
