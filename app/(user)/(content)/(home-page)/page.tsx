import type { Metadata } from "next";
import UserHeader from "../_layout/header";
import { Suspense } from "react";
import MessagesCount from "./messages-count";
import MessagesCountSkeleton from "@/components/skeletons/messages-count-sleleton";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function HomePage() {
  return (
    <>
      <div className="">
        <p className="text-2xl font-bold mb-4">Messages</p>
        {/* <Suspense fallback={<MessagesCountSkeleton />}> */}
        <MessagesCount />
        {/* </Suspense> */}
      </div>
    </>
  );
}
