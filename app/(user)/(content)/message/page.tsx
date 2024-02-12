import type { Metadata } from "next";
import UserHeader from "../_layout/header";
import { Suspense } from "react";
import { SpinnerSuspense } from "@/components/spinner";
import Messagestable from "./messages-table";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <UserHeader heading="Messages" />

      <div className="">
        <p className="text-2xl font-bold my-5">All Messages</p>

        <Suspense fallback={<SpinnerSuspense />}>
          <Messagestable searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
