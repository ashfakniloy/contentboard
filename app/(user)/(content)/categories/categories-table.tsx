import { categoriesColumn } from "@/components/data-table/columns/categories-column";
import { DataTable } from "@/components/data-table";
import { getCategories } from "@/db/user/queries/get-categories";
import { getAuthSession } from "@/lib/next-auth";
import { deleteCategory } from "@/db/user/mutations/delete-category";

export default async function CategoriesTable({
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

  const { categories, categoriesCount } = await getCategories({
    userId,
    sortBy,
    orderBy,
    limitNumber,
    pageNumber,
    categoryName: search,
  });

  console.log("categoriescount", categoriesCount);

  // if (!categories.length) {
  //   return (
  //     <p className="mt-20 text-xl text-center font-bold text-red-500">
  //       No categories found
  //     </p>
  //   );
  // }

  return (
    <div>
      {categories && (
        <DataTable
          columns={categoriesColumn}
          data={categories}
          searchBy="category"
          count={categoriesCount}
          deleteAction={deleteCategory}
          manualControl
        />
      )}
    </div>
  );
}
