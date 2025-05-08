"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Icons from "./icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SignUp from "@/app/(auth)/sign-up/page";

const LoginForm = ({ origin = "signIn" }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    try {
      if (origin === "signIn") {
        signIn("credentials", {
          ...data,
          redirect: false,
        }).then((res) => {
          if (res?.ok) {
            console.log("Logged in");
          } else if (res?.error) {
            console.log("Somethign went wrf");
          }
          router.refresh();
        });
      } else {
        //api call
        axios
          .post("/api/auth/register", data)
          .then(() => router.push("/sign-in"))
          .catch(console.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="space-y-2 w-full sm:w-1/2 mx-auto p-2 flex flex-col items-center">
        {origin === "signUp" && (
          <Input placeholder="Your name" type="text" {...register("name")} />
        )}
        <Input placeholder="email" type="email" {...register("email")} />
        <Input
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <Button className="w-full" onClick={handleSubmit(onSubmit)}>
          {origin === "signIn" ? "Sign in " : "Sign up"}
        </Button>
        <Button className="w-full" onClick={() => signIn("google")}>
          <Icons.google />
          {origin === "SignIn" ? "Sign in with google " : "Sign up with google"}
        </Button>
        {origin === "signUp" ? (
          <span>
            Already have an account ?
            <Link href="/sign-in" className="font-semibold underline p-2">
              Sign in
            </Link>
          </span>
        ) : (
          <span>
            New to Airbnb ?
            <Link href="/sign-up" className="font-semibold underline p-2">
              Sign up
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
