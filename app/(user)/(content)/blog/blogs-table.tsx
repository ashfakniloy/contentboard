import { DataTable } from "@/components/data-table";
import { getAuthSession } from "@/lib/next-auth";
// import { deleteCategory } from "@/db/user/mutations/delete-category";
import { blogsColumn } from "@/components/data-table/columns/blogs-column";
import { getBlogs } from "@/db/user/queries/get-blogs";
import { deleteBlog } from "@/db/user/mutations/delete-blog";

export default async function BlogsTable({
  searchParams: { limit, page, search, sort },
}: {
  searchParams: SearchParams;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const session = await getAuthSession();

  if (!session) return;

  const userId = session?.user.id;

  const limitNumber = Number(limit);
  const pageNumber = Number(page);

  const sortValues = sort?.split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  const { blogs, blogsCount } = await getBlogs({
    userId,
    sortBy,
    orderBy,
    limitNumber,
    pageNumber,
    title: search,
  });

  console.log("blogsCount", blogsCount);

  // if (!blogs.length) {
  //   return (
  //     <p className="mt-20 text-xl text-center font-bold text-red-500">
  //       No blogs found
  //     </p>
  //   );
  // }

  return (
    <div>
      {blogs && (
        <DataTable
          columns={blogsColumn}
          data={blogs}
          searchBy="blog"
          count={blogsCount}
          deleteAction={deleteBlog}
          manualControl
        />
      )}
    </div>
  );
}
