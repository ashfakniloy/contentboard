import type { Metadata } from "next";
import UserHeader from "../_layout/header";
import CategoryForm from "./category-form";
import CategoriesTable from "./categories-table";
import { Suspense } from "react";
import { SpinnerSuspense } from "@/components/spinner";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <UserHeader heading="Categories" />
      <div className="">
        <p className="text-2xl font-bold mb-5">Add New Category</p>
        <CategoryForm />
      </div>

      <div className="my-10">
        <p className="text-2xl font-bold my-5">All Categories</p>
        <Suspense fallback={<SpinnerSuspense />}>
          <CategoriesTable searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
