import { getCategories } from "@/db/user/queries/get-categories";
import { getAuthSession } from "@/lib/next-auth";
import EditBlogForm from "./edit-blog-form";
import { getSingleBlog } from "@/db/user/queries/get-single-blog";
import { notFound } from "next/navigation";

export default async function EditBlog({
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

  return <EditBlogForm categories={categories} blog={blog} />;
}
