"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import UserHeader from "./_layout/header";
import BackButton from "@/components/back-button";

export default function UserMainError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <UserHeader heading="Error" />
      <div className="mt-5">
        <BackButton />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center min-h-[81.2vh]">
        <h4 className="text-xl font-semibold text-red-500">
          Something went wrong!
        </h4>
        <Button
          type="button"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </>
  );
}
