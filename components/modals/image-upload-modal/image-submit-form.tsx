import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form-fields/input-field";
import { TextareaField } from "@/components/form-fields/textarea-field";
import { Spinner } from "@/components/spinner";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaProps, mediaSchema } from "@/schemas/media-schema";

type ImageSubmitFormProps = {
  imageId: string;
  imageUrl: string;
  handleImageSubmit: (imageValues: MediaProps) => void;
  imageSubmitting?: boolean;
};

export default function ImageSubmitForm({
  imageId,
  imageUrl,
  handleImageSubmit,
  imageSubmitting,
}: ImageSubmitFormProps) {
  const defaultValues = {
    imageUrl: imageUrl,
    imageId: imageId,
    altText: "",
    imageTitle: "",
  };

  const form = useForm<MediaProps>({
    // defaultValues,
    values: defaultValues,
    resolver: zodResolver(mediaSchema),
  });

  const imageOnSubmit = (values: MediaProps) => {
    // console.log("values", values);
    // return;

    handleImageSubmit(values);
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={(e) => {
            e.stopPropagation(); // for preventing nested form to trigger submit in parent form
            return form.handleSubmit(imageOnSubmit)(e);
          }}
          className="space-y-7"
          noValidate
        >
          <InputField
            label="Image Title:"
            placeholder="Your text here"
            name="imageTitle"
            type="text"
          />
          <TextareaField
            label="Alt Text"
            placeholder="Your text here"
            name="altText"
            className="resize-none"
          />

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              className="mt-3 w-[150px] relative"
              disabled={imageSubmitting}
            >
              {imageSubmitting && <Spinner className="absolute left-5 " />}
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
