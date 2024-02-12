"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { EmailField } from "@/components/form-fields/email-field";
import { PasswordField } from "@/components/form-fields/password-field";
import { useRouter } from "next/navigation";
import { SignupProps, signupSchema } from "@/schemas/signup-schema";
import { userSignup } from "@/db/user/mutations/user-signup";
import Link from "next/link";
import { UsernameField } from "@/components/form-fields/username-field";

export default function UserSignupForm() {
  const router = useRouter();

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<SignupProps>({
    defaultValues,
    resolver: zodResolver(signupSchema),
  });

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: SignupProps) => {
    // console.log("values", values);
    // return;

    const result = await userSignup({ values });

    if (result?.success) {
      toast.success(result.success);
      router.push("/signin");
    } else if (result?.error) {
      console.log("error", result);
      toast.error(result.error);

      const errorType = result?.errorType as "username" | "email";

      errorType &&
        setError(errorType, { message: result.error }, { shouldFocus: true });
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="w-[400px] 2xl:w-[473px] px-10 py-[68px] bg-white rounded-2xl shadow-lg">
      <div className=" flex flex-col items-center font-manrope">
        <h1 className="text-2xl font-bold">Create New Account</h1>
        <p className="text-custom-red">Sign up to continue</p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-[54px] space-y-9"
          noValidate
        >
          <UsernameField placeholder="Username" name="username" />
          <EmailField placeholder="Email" name="email" />
          <PasswordField placeholder="Password" name="password" />
          <PasswordField
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <div className="mt-10">
            <Button
              type="submit"
              size="lg"
              className="relative w-full"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <span className="absolute left-24 2xl:left-32">
                  <Spinner />
                </span>
              )}
              Sign up
            </Button>

            <div className="mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Already have have an account?{" "}
                <Link
                  href="/signin"
                  className="text-blue-500 hover:text-blue-900 transition-colors duration-200"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
