import type { Metadata } from "next";
import { getCategories } from "@/db/user/queries/get-categories";
import { getAuthSession } from "@/lib/next-auth";
import AddBlogForm from "./add-blog-form";

export const metadata: Metadata = {
  title: "Add new blog",
};

export default async function AddBlogPage() {
  const session = await getAuthSession();

  if (!session) return;
  const userId = session.user.id;

  const { categories } = await getCategories({ userId });

  return (
    <div className="-mt-2 lg:-mt-7">
      <AddBlogForm categories={categories} />
    </div>
  );
}
