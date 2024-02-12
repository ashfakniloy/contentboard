import type { Metadata } from "next";
import UserHeader from "../_layout/header";
import { Suspense } from "react";
import { SpinnerSuspense } from "@/components/spinner";
import Settings from "./settings";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <>
      <UserHeader heading="Settings" />

      <Suspense fallback={<SpinnerSuspense />}>
        <Settings />
      </Suspense>
    </>
  );
}
