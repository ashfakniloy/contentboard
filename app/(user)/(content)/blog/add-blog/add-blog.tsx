import { getCategories } from "@/db/user/queries/get-categories";
import { getAuthSession } from "@/lib/next-auth";
import AddBlogForm from "./add-blog-form";

export default async function AddBlog() {
  const session = await getAuthSession();

  if (!session) return;

  const userId = session.user.id;

  const { categories } = await getCategories({ userId });

  return <AddBlogForm categories={categories} />;
}
