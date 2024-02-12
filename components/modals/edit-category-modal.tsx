import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

import { Spinner } from "@/components/spinner";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import slugify from "slugify";
import { InputField } from "@/components/form-fields/input-field";
import { CategoryProps, categorySchema } from "@/schemas/category-schema";
import { TextareaField } from "@/components/form-fields/textarea-field";
import { useEffect } from "react";
import { Category } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";
import { editCategory } from "@/db/user/mutations/edit-category";

type EditCategoryModalProps = {
  category: Category;
  showEditModal: boolean;
  setShowEditModal: (arg: boolean) => void;
};

export function EditCategoryModal({
  category,
  showEditModal,
  setShowEditModal,
}: EditCategoryModalProps) {
  const defaultValues = {
    categoryName: category.categoryName,
    slug: category.slug,
    description: category.description,
  };

  const form = useForm<CategoryProps>({
    // defaultValues,
    values: defaultValues, // using values instead of defaultvalues for updating the form values after submit
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

  const onSubmit = async (values: CategoryProps) => {
    // console.log("values", values);
    // return;

    const result = await editCategory({ categoryId: category.id, values });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success);

      setShowEditModal(false);

      // reset();
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
    <AlertDialog
      open={showEditModal}
      onOpenChange={setShowEditModal}
      // key={categoryInfo.id}
    >
      <AlertDialogContent className="bg-white w-[626px] py-9 px-0">
        <p className="text-center text-2xl font-bold">
          Edit {category.categoryName}
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full"
            noValidate
          >
            <ScrollArea className="">
              <div className="max-h-[60dvh] space-y-9 px-9 mb-6">
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

                <TextareaField
                  name="description"
                  label="Category Description:"
                  placeholder="Enter category description"
                />
              </div>
            </ScrollArea>

            <div className="pt-2 flex justify-center gap-5 w-full px-9">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setShowEditModal(false);
                  reset();
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="relative w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <div className="absolute flex items-center left-12">
                    <Spinner className="border-gray-300 border-r-gray-300/30 border-b-gray-300/30" />
                  </div>
                )}
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
