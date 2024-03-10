import LoginForm from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back 👋</CardTitle>
            <CardDescription>
              Sign in to access your personal account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
