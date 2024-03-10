import RegisterForm from "@/components/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Join Trendify Today ❤️</CardTitle>
            <CardDescription>
              Embark on a fashion journey tailed for you
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
