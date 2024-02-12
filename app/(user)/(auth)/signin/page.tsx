import type { Metadata } from "next";
import UserSigninForm from "./signin-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function UserSigninPage() {
  return (
    <Suspense fallback={null}>
      <UserSigninForm />
    </Suspense>
  );
}
