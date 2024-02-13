import type { Metadata } from "next";
import { Suspense } from "react";
import UserHeader from "../../../_layout/header";
import { SpinnerSuspense } from "@/components/spinner";
import { getAuthSession } from "@/lib/next-auth";
import { getCategories } from "@/db/user/queries/get-categories";
import { getSingleBlog } from "@/db/user/queries/get-single-blog";
import { notFound } from "next/navigation";
import EditBlogForm from "./edit-blog-form";

export const metadata: Metadata = {
  title: "Edit blog",
};

export default async function EditBlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const session = await getAuthSession();

  if (!session) return;

  const userId = session.user.id;
  const decodedSlug = decodeURIComponent(slug);

  const { categories } = await getCategories({ userId });

  const { blog } = await getSingleBlog({ decodedSlug, userId });

  if (!blog) {
    notFound();
  }

  return (
    <>
      <EditBlogForm categories={categories} blog={blog} />
    </>
  );
}
