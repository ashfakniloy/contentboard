import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthSession } from "@/lib/next-auth";
import EditBlogForm from "./edit-blog-form";
import { getCategories } from "@/db/user/queries/get-categories";
import { getSingleBlog } from "@/db/user/queries/get-single-blog";

export const metadata: Metadata = {
  title: "Edit blog",
};

export default async function EditBlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
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
    <div className="-mt-2 lg:-mt-7">
      <EditBlogForm categories={categories} blog={blog} />
    </div>
  );
}
