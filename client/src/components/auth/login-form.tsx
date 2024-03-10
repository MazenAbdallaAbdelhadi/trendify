import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// icons
import { AlertCircle } from "lucide-react";

// local imports
import { useLoginMutation } from "@/services/api/auth";
import { loginSchema } from "@/lib/schema/auth";
import { extractError } from "@/lib/utils";
import InputField from "../form/input-field";
import { Form } from "../ui/form";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const LoginForm = () => {
  // 1- login mutaion
  const { mutate, isPending, isError, error, isSuccess } = useLoginMutation();

  // 2- login form
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3- send login data to server
  const handleLogin = (data: z.infer<typeof loginSchema>) => {
    console.log("data form LOGIN_FORM: ", data);
    mutate(data);
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
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        {/* error alert */}
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>ERROR</AlertTitle>
            <AlertDescription>{extractError(error).msg}</AlertDescription>
          </Alert>
        )}

        <InputField name="email" label="Email">
          <Input placeholder="user@example.com" />
        </InputField>

        <InputField name="password" label="Password">
          <Input placeholder="**********" />
        </InputField>

        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
