"use client";

import Navbar from "@/app/Components/Navbar";
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
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CreateNewAccount } from "@/utils/server";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SignInComp from "@/app/Components/register/SignInComp";
import { toast } from "@/components/ui/use-toast";

const RegisterPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }

  const [state, formAction] = useFormState(CreateNewAccount, undefined);

  const [reg, setReg] = useState("sign");

  useEffect(() => {
    state?.success && setReg("log");
    toast({
      title: "موفقیت ",
      description: "ساخت حساب کاربری شما سخاخته شد",
    });
  }, [state?.success, reg]);
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[12rem] m-auto">
      <Navbar />

      <div dir="rtl" className="">
        <div className=" flex w-full justify-center items-center mt-10 lg:mt-20">
          <Card className="w-[350px] lg:w-[450px]">
            <div className={`${reg === "log" && "hidden"}`}>
              <CardHeader>
                <CardTitle>عضویت</CardTitle>
                <CardDescription>ساخت حساب کاربری</CardDescription>
                <Button
                  onClick={() => {
                    signIn("google");
                  }}
                >
                  ورود با جیمیل <Mail />
                </Button>
              </CardHeader>
              <CardContent>
                <form autoComplete="off" action={formAction}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">ایمیل</Label>
                      <Input
                        autoComplete="false"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="ایمیل"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">رمز عبور</Label>
                      <Input
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="رمز عبور شما"
                      />
                      <Label htmlFor="rpassword">تکرار رمز عبور</Label>
                      <Input
                        autoComplete="new-password"
                        type="password"
                        name="rep_password"
                        id="rpassword"
                        placeholder="تکرار رمز عبور  "
                      />
                    </div>
                  </div>
                  <CardFooter className="flex mt-4 flex-col gap-4 justify-between">
                    <Button type="submit">ساخت حساب</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </div>
            <div className={`${reg === "sign" && "hidden"}`}>
              <SignInComp />
            </div>
            {reg === "sign" ? (
              <button
                onClick={() => {
                  setReg("log");
                }}
                className={`text-blue-400 dark:text-blue-700 cursor-pointer block w-full mx-auto pb-5`}
              >
                ثبت نام کرده اید؟اینجاکلیک کنید{" "}
              </button>
            ) : (
              <button
                onClick={() => {
                  setReg("sign");
                }}
                className={`text-blue-400 dark:text-blue-700 cursor-pointer block w-full mx-auto pb-5`}
              >
                ثبت نام نکرده اید؟اینجاکلیک کنید{" "}
              </button>
            )}
            {state?.error && (
              <div className="text-red-400 text-center mb-3">{state.error}</div>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
