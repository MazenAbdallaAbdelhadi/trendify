import RegisterForm from "@/components/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="p-8">
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

          <CardFooter>
            <p>
              already have an account?
              <Link to="/login" className="underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
