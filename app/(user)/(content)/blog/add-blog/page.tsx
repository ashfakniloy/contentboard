import type { Metadata } from "next";
import UserHeader from "../../_layout/header";
// import { getCategories } from "@/db/user/queries/get-categories";
// import { getAuthSession } from "@/lib/next-auth";
// import BlogForm from "./blog-form";
import AddBlog from "./add-blog";
import { Suspense } from "react";
import { SpinnerSuspense } from "@/components/spinner";

export const metadata: Metadata = {
  title: "Add new blog",
};

export default function AddBlogPage() {
  return (
    <>
      <UserHeader heading="Add New Blog" />

      <Suspense fallback={<SpinnerSuspense />}>
        <div className="-mt-2 lg:-mt-7">
          <AddBlog />
        </div>
      </Suspense>
    </>
  );
}
