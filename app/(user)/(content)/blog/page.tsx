import type { Metadata } from "next";
import UserHeader from "../_layout/header";
import Link from "next/link";
import { IconPlus } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import BlogsTable from "./blogs-table";
import { SpinnerSuspense } from "@/components/spinner";

export const metadata: Metadata = {
  title: "All blogs",
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <UserHeader heading="All Blogs" />

      <div className="mt-10 flex justify-end">
        <Link href="/blog/add-blog">
          <Button type="button" className="w-[176px] rounded-full space-x-4">
            <IconPlus />
            <span>New Post</span>
          </Button>
        </Link>
      </div>

      <div className="my-10">
        <Suspense fallback={<SpinnerSuspense />}>
          <BlogsTable searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
