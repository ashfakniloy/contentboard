"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import slugify from "slugify";
import { CheckboxField } from "@/components/form-fields/checkbox-field";
import { InputField } from "@/components/form-fields/input-field";
import { Spinner } from "@/components/spinner";
import ImageUploadModal from "@/components/modals/image-upload-modal";
import { Button } from "@/components/ui/button";
import { IconDraft, IconPaperPlus, IconSend, IconX } from "@/components/icons";
import { Blog, Category } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogProps, blogSchema } from "@/schemas/blog-schema";
import { TextEditorField } from "@/components/form-fields/text-editor-field";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { editBlog } from "@/db/user/mutations/edit-blog";

export default function EditBlogForm({
  categories,
  blog,
}: {
  categories: Category[];
  blog: Blog;
}) {
  const [showImageModal, setShowImageModal] = useState(false);
  const router = useRouter();

  const defaultValues = {
    title: blog.title,
    body: blog.body,
    author: blog.author,
    categories: blog.categories,
    featuredImage: blog.featuredImage,
    bodyImage: blog.categories,
    metaDescription: blog.metaDescription,
    slug: blog.slug,
    published: blog.published,
  };

  const form = useForm<BlogProps>({
    defaultValues,
    resolver: zodResolver(blogSchema),
  });

  const {
    watch,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const title = watch("title");
  const published = watch("published");
  const featuredImage = watch("featuredImage");

  console.log("featuredImage", featuredImage);

  useEffect(() => {
    if (title) {
      const slug = slugify(title, { lower: true });
      setValue("slug", slug);
    }
  }, [title, setValue]);

  const onSubmit = async (values: BlogProps) => {
    // console.log("values", values);

    const result = await editBlog({ values, blogId: blog.id });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success);

      router.push("/blog");

      // reset();
    } else if (result.error) {
      toast.error(result.error);

      const errorType = result?.errorType as "title" | "slug";

      errorType &&
        setError(errorType, { message: result.error }, { shouldFocus: true });
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="w-full">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-5 border-b border-gray-300"
          noValidate
        >
          <div className="w-full  max-w-[622px] 2xl:max-w-[1170px] min-h-[90vh] border-r border-gray-300 pr-5">
            <div className="mt-5 mb-10 space-y-9">
              <InputField
                label="Title:"
                placeholder="Enter blog title"
                name="title"
              />

              <div className="mt-5">
                <TextEditorField label="Body:" name="body" />
              </div>
            </div>
          </div>
          <div className="mt-5 w-[545px]">
            <div className="flex justify-end items-center gap-3">
              <Button
                type="submit"
                variant="outline"
                onClick={() => setValue("published", false)}
                disabled={isSubmitting}
                className="w-[178px] flex justify-center items-center rounded-full gap-2"
              >
                <span className="size-5">
                  {isSubmitting ? (
                    published === false ? (
                      <Spinner className="size-5 border-gray-500 border-r-gray-500/30 border-b-gray-500/30" />
                    ) : (
                      <IconDraft />
                    )
                  ) : (
                    <IconDraft />
                  )}
                </span>
                Save as Draft
              </Button>
              <Button
                type="submit"
                onClick={() => setValue("published", true)}
                disabled={isSubmitting}
                className="w-[178px] flex justify-center items-center rounded-full gap-2.5"
              >
                <span className="size-5">
                  {isSubmitting ? (
                    published === true ? (
                      <Spinner className="size-5" />
                    ) : (
                      <IconSend />
                    )
                  ) : (
                    <IconSend />
                  )}
                </span>
                Publish
              </Button>
            </div>

            <div className="mt-5 space-y-9">
              <InputField
                label="Author:"
                placeholder="Type author name"
                name="author"
                type="text"
                required
              />
              <div className="relative">
                <p className="font-medium mb-2">Category:</p>
                <div className="flex flex-wrap gap-x-5 gap-y-3">
                  {categories.length ? (
                    categories.map((category) => (
                      <CheckboxField
                        key={category.id}
                        label={category.categoryName}
                        name="categories"
                        // value={category.categoryName}
                      />
                    ))
                  ) : (
                    <p>No categories found</p>
                  )}
                </div>
                {errors["categories"] && (
                  <p className="absolute mt-0.5 text-sm text-red-600">
                    {errors["categories"]?.message?.toString()}
                  </p>
                )}
              </div>

              <div className="relative">
                <p className="mb-2 font-medium">Featured Image:</p>
                <div className="relative h-[160px] w-full rounded-md overflow-hidden border-gray-400 bg-gray-100 flex justify-center items-center">
                  {!featuredImage?.imageUrl ? (
                    <ImageUploadModal
                      withLibrary
                      showImageModal={showImageModal}
                      setShowImageModal={setShowImageModal}
                      handleImageSubmit={(values) =>
                        setValue("featuredImage", values)
                      }
                    >
                      <button
                        type="button"
                        className="w-full h-full flex justify-center items-center"
                      >
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <span>
                            <IconPaperPlus />
                          </span>
                          <p>Add featured image</p>
                        </div>
                      </button>
                    </ImageUploadModal>
                  ) : (
                    <>
                      <Image
                        src={featuredImage.imageUrl}
                        alt={featuredImage.altText}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 text-black p-0.5 rounded-full bg-white border border-black"
                        onClick={() =>
                          setValue("featuredImage", {
                            imageUrl: "",
                            imageId: "",
                            imageTitle: "",
                            altText: "",
                          })
                        }
                      >
                        <IconX />
                      </button>
                    </>
                  )}
                </div>
                {errors["featuredImage"] && (
                  <p className="absolute mt-0.5 text-sm text-red-600">
                    Featured image is required
                  </p>
                )}
              </div>

              <InputField
                label="Meta Description:"
                placeholder="Meta Description (70-160 char. including white space)"
                name="metaDescription"
                className="placeholder:text-[13px]"
              />
              <InputField
                label="Slug:"
                placeholder="Enter title to get slug"
                name="slug"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
