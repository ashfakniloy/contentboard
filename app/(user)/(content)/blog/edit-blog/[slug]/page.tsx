import type { Metadata } from "next";
import { Suspense } from "react";
import EditBlog from "./edit-blog";
import UserHeader from "../../../_layout/header";
import { SpinnerSuspense } from "@/components/spinner";

export const metadata: Metadata = {
  title: "Edit blog",
};

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <UserHeader heading="Edit Blog" />

      <Suspense fallback={<SpinnerSuspense />}>
        <div className="-mt-2 lg:-mt-7">
          <EditBlog params={params} />
        </div>
      </Suspense>
    </>
  );
}
