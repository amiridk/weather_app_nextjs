import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
const handleLogIn = async (formData) => {

  const { email, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    throw new Error(err);
  }
};
const SignInComp = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>ورود</CardTitle>
        <CardDescription> ورود به حساب کاربری</CardDescription>
        <Button
          onClick={() => {
            signIn("google");
          }}
        >
          ورود با جیمیل <Mail />
        </Button>
      </CardHeader>
      <CardContent>
        <form action={handleLogIn}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">ایمیل</Label>
              <Input type="email" name="email" id="email" placeholder="ایمیل" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="رمز عبور شما"
              />
              <CardFooter className=" flex flex-col gap-4 justify-between">
                <Button className="mt-4" type="submit">
                  {" "}
                  ورود{" "}
                </Button>
              </CardFooter>
            </div>
          </div>
        </form>
      </CardContent>
    </>
  );
};

export default SignInComp;
