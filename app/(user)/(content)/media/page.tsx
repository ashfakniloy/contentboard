import type { Metadata } from "next";
import UserHeader from "../_layout/header";
import { Suspense } from "react";
import Medias from "./medias";
import { SpinnerSuspense } from "@/components/spinner";

export const metadata: Metadata = {
  title: "Media",
};

export default function MediaPage() {
  return (
    <>
      <UserHeader heading="All Media" />

      <Suspense fallback={<SpinnerSuspense />}>
        <Medias />
      </Suspense>
    </>
  );
}
