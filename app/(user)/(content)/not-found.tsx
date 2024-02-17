import type { Metadata } from "next";
import UserHeader from "./_layout/header";
import BackButton from "@/components/back-button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function UserNotFoundPage() {
  return (
    <>
      <UserHeader heading="Page Not Found" />

      <BackButton />

      <div className="min-h-[calc(100vh-200px)] flex justify-center items-center">
        <p className="text-2xl lg:text-4xl font-bold">404 | Page not found</p>
      </div>
    </>
  );
}
