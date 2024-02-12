import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { InputField } from "@/components/form-fields/input-field";
import { TextareaField } from "@/components/form-fields/textarea-field";
import { FormProvider, useForm } from "react-hook-form";
import { MediaProps, mediaSchema } from "@/schemas/media-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Media } from "@prisma/client";
import { editMedia } from "@/db/user/mutations/edit-media";

type MediaFormProps = {
  // id: string;
  // imageTitle: string;
  // altText: string;
  selectedImage: Media;
  setImageTitleState: React.Dispatch<React.SetStateAction<string>>;
};

export default function MediaForm({
  // id,
  // imageTitle,
  // altText,
  selectedImage,
  setImageTitleState,
}: MediaFormProps) {
  // const initialValues = {
  //   imageTitle: imageTitle || "",
  //   altText: altText || "",
  // };

  const defaultValues = {
    imageUrl: selectedImage.imageUrl || "",
    imageId: selectedImage.imageId || "",
    altText: selectedImage.altText || "",
    imageTitle: selectedImage.imageTitle || "",
  };

  const form = useForm<MediaProps>({
    // defaultValues,
    values: defaultValues,
    resolver: zodResolver(mediaSchema),
  });

  const {
    reset,
    watch,
    formState: { isSubmitting },
    setValue,
  } = form;

  const onSubmit = async (values: MediaProps) => {
    // console.log("values", values);
    // return;

    const result = await editMedia({ mediaId: selectedImage.id, values });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success);
      setImageTitleState(values.imageTitle);
    } else if (result.error) {
      toast.error(result.error);
    } else {
      toast.error("Error");
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7"
          noValidate
        >
          <InputField
            label="Image Title:"
            placeholder="Your text here"
            name="imageTitle"
            type="text"
            required
          />
          <TextareaField
            label="Alt Text:"
            placeholder="Your text here"
            name="altText"
            required
          />

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              className="mt-3 w-[150px] relative"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner className="absolute left-5 " />}
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
