"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import slugify from "slugify";
import { InputField } from "@/components/form-fields/input-field";
import { CategoryProps, categorySchema } from "@/schemas/category-schema";
import { addCategory } from "@/db/user/mutations/add-category";
import { TextareaField } from "@/components/form-fields/textarea-field";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const defaultValues = {
    categoryName: "",
    slug: "",
    description: "",
  };

  const form = useForm<CategoryProps>({
    defaultValues,
    resolver: zodResolver(categorySchema),
  });

  const {
    reset,
    watch,
    setValue,
    setError,
    formState: { isSubmitting },
  } = form;

  const categoryName = watch("categoryName");

  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      setValue("slug", slug);
    }
  }, [categoryName, setValue]);

  const router = useRouter();

  const onSubmit = async (values: CategoryProps) => {
    // console.log("values", values);
    // return;

    const result = await addCategory({ values });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success);

      router.replace("/categories", { scroll: false });

      reset();
    } else if (result.error) {
      toast.error(result.error);

      const errorType = result?.errorType as "categoryName" | "slug";

      errorType &&
        setError(errorType, { message: result.error }, { shouldFocus: true });
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-9 w-full"
          noValidate
        >
          <div className="flex items-center w-full gap-14">
            <InputField
              name="categoryName"
              label="Category Name:"
              placeholder="Enter category name"
            />
            <InputField
              name="slug"
              label="Slug:"
              placeholder="Enter category name to get slug"
            />
          </div>
          <TextareaField
            name="description"
            label="Category Description:"
            placeholder="Enter category description"
          />

          <div className="mt-6 flex items-center gap-3">
            <Button
              type="submit"
              className="px-6 rounded-full"
              disabled={isSubmitting}
            >
              Create New Category
            </Button>
            {isSubmitting && (
              <Spinner className="border-gray-400 border-r-gray-400/30 border-b-gray-400/30" />
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
