import type { Metadata } from "next";
import UserSignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function UserSignupPage() {
  return <UserSignupForm />;
}
