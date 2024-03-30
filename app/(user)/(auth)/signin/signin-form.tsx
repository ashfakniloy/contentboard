"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { EmailField } from "@/components/form-fields/email-field";
import { PasswordField } from "@/components/form-fields/password-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { SigninProps, signinSchema } from "@/schemas/signin-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UserSigninForm() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url") || "/";

  const [guestIsSubmitting, setGuestIsSubmitting] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<SigninProps>({
    defaultValues,
    resolver: zodResolver(signinSchema),
  });

  const {
    formState: { isSubmitting },
    setError,
  } = form;

  const onSubmit = async (values: SigninProps) => {
    const response = await signIn("credentials", {
      ...values,
      role: "USER",
      // callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    // console.log("response", response);

    if (!response?.error) {
      console.log("succcess", response);

      // toast.success("Signin successfull");
      // router.refresh();
      // router.push(callback_url);
      window.location.assign(callback_url);
    } else {
      console.log("error", response);
      //  const errorType = result?.errorType as ErrorType;

      const emailError = response?.error === "Incorrect Email";
      const passwordError = response?.error === "Incorrect Password";

      emailError &&
        setError("email", { message: response.error }, { shouldFocus: true });
      passwordError &&
        setError(
          "password",
          { message: response.error },
          { shouldFocus: true }
        );

      toast.error(response.error);
    }
  };

  const handleGuestSignin = async () => {
    setGuestIsSubmitting(true);

    const response = await signIn("credentials", {
      email: "",
      password: "",
      role: "GUEST_USER",
      // callbackUrl: callback_url,
      redirect: false,
    });

    // console.log("response", response);

    if (!response?.error) {
      console.log("succcess", response);

      // router.refresh();
      // router.push(callback_url);
      window.location.assign(callback_url);
    } else {
      console.log("error", response);
      toast.error(response.error);
    }

    setGuestIsSubmitting(false);
  };

  return (
    <div className="w-full lg:w-[400px] 2xl:w-[473px] px-5 lg:px-10 py-14 lg:py-[68px] rounded-2xl shadow-lg bg-white dark:bg-custom-gray4">
      <div className="flex flex-col items-center font-manrope">
        <h1 className="text-2xl font-bold">Welcome !</h1>
        <p>Sign in to continue</p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-[54px] space-y-9"
          noValidate
        >
          <EmailField placeholder="Email" name="email" />
          <PasswordField placeholder="Password" name="password" />
          <div className="mt-10">
            <Button
              type="submit"
              size="lg"
              className="relative w-full"
              disabled={isSubmitting || guestIsSubmitting}
            >
              {isSubmitting && (
                <span className="absolute flex items-center left-24 2xl:left-32">
                  <Spinner />
                </span>
              )}
              Sign in
            </Button>

            <div className="my-4 flex justify-between items-center">
              <hr className="w-full" />
              <p className="mx-3 text-sm font-medium">Or</p>
              <hr className="w-full" />
            </div>

            <p className="mb-2 text-center text-[15px] font-medium ">
              Sign in as guest
            </p>

            <Button
              type="button"
              size="lg"
              className="relative w-full bg-violet-500 hover:bg-violet-500/90"
              onClick={handleGuestSignin}
              disabled={isSubmitting || guestIsSubmitting}
            >
              {guestIsSubmitting && (
                <span className="absolute flex items-center left-20 2xl:left-28">
                  <Spinner />
                </span>
              )}
              View demo
            </Button>

            <div className="mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {`Don't have an account? `}
                <Link
                  href="/signup"
                  className="text-blue-500 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
