import { useState } from "react";

import { ImageIcon } from "./icons/image-icon";
import ImageUploadModal from "../modals/image-upload-modal";
import type { Editor } from "@tiptap/react";
import { MediaProps } from "@/schemas/media-schema";
import { useFormContext } from "react-hook-form";

export default function ImageUpload({ editor }: { editor: Editor | null }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const { getValues, setValue } = useFormContext();

  const bodyImages = getValues("bodyImages") ?? [];

  const handleImageSubmit = (imageValues: MediaProps) => {
    // console.log("imageValues", imageValues);

    editor
      ?.chain()
      ?.focus()
      .setImage({
        src: imageValues.imageUrl,
        alt: imageValues.altText,
        title: imageValues.imageTitle,
      })
      .run();

    setValue("bodyImages", [...bodyImages, imageValues]);

    setShowImageModal(false);
  };

  return (
    <ImageUploadModal
      withLibrary
      showImageModal={showImageModal}
      setShowImageModal={setShowImageModal}
      handleImageSubmit={handleImageSubmit}
    >
      <button
        type="button"
        className={showImageModal ? "is-active" : ""}
        title="Image"
      >
        <span className="fill-gray-700">
          <ImageIcon />
        </span>
      </button>
    </ImageUploadModal>
  );
}
