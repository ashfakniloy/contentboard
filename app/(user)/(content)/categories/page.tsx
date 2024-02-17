import type { Metadata } from "next";
import CategoryForm from "./category-form";
import { getAuthSession } from "@/lib/next-auth";
import { getCategories } from "@/db/user/queries/get-categories";
import { DataTable } from "@/components/data-table";
import { deleteCategory } from "@/db/user/mutations/delete-category";
import { categoriesColumn } from "./categories-table/categories-column";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function CategoriesPage({
  searchParams: { limit, page, search, sort },
}: {
  searchParams: SearchParams;
}) {
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
    <>
      <div>
        <p className="text-2xl font-bold mb-5">Add New Category</p>
        <CategoryForm />
      </div>

      <div className="my-10">
        <p className="text-2xl font-bold my-5">All Categories</p>

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
    </>
  );
}
