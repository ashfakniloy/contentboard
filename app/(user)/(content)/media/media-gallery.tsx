"use client";

import type { Media } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Trash2, X } from "lucide-react";
import { IconPaperPlus, IconTick } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ImageUploadModal from "@/components/modals/image-upload-modal";
import MediaDetails from "./media-details";
import { DeleteModal } from "@/components/modals/delete-modal";
import { addMedia } from "@/db/user/mutations/add-media";
import { deleteMedia } from "@/db/user/mutations/delete-media";
import { MediaProps } from "@/schemas/media-schema";

export default function MediaGallery({ medias }: { medias: Media[] }) {
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [selectedMultipleImages, setSelectedMultipleImages] = useState<
    string[]
  >([]);

  const [showImageModal, setShowImageModal] = useState(false);
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [showMultipleDeleteModal, setShowMultipleDeleteModal] = useState(false);
  const [isMultipleDeleting, setIsMultipleDeleting] = useState(false);

  const [imageSubmitting, setImageSubmitting] = useState(false);

  const handleImageClick = (media: Media) => {
    if (isMultipleSelect) {
      toggleSelectedImage(media);
    } else {
      if (selectedImage?.id === media.id) {
        setSelectedImage(null); // Close image details if the same image is clicked again
      } else {
        setSelectedImage(media);
      }
    }
  };

  const toggleSelectedImage = (media: Media) => {
    const isSelected = selectedMultipleImages.some(
      (selectedMedia) => selectedMedia === media.id
    );

    if (isSelected) {
      setSelectedMultipleImages(
        selectedMultipleImages.filter((m) => m !== media.id)
      );
    } else {
      setSelectedMultipleImages([...selectedMultipleImages, media.id]);
    }
  };

  const handleImageSubmit = async (imageValues: MediaProps) => {
    setImageSubmitting(true);

    const result = await addMedia({ values: imageValues });

    if (result.success) {
      toast.success(result.success);
      setShowImageModal(false);
    } else if (result.error) {
      toast.error(result.error);
    } else {
      toast.error("Error");
    }

    setImageSubmitting(false);
  };

  const handleMultipleDelete = async () => {
    // console.log("multiple", selectedMultipleImages);

    setIsMultipleDeleting(true);

    const result = await deleteMedia({ mediaId: selectedMultipleImages });

    if (result?.success) {
      setSelectedMultipleImages([]);
      toast.success(result.success);
    } else if (result?.error) {
      toast.error(result.error);
    } else {
      toast.error("Error");
    }

    setShowMultipleDeleteModal(false);
    setIsMultipleDeleting(false);
  };

  return (
    <div>
      <div className="flex justify-end gap-4">
        {selectedMultipleImages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowMultipleDeleteModal(true)}
          >
            <Trash2 className="w-4 h-4" />
            {`Delete ${selectedMultipleImages.length} item(s)`}
          </Button>
        )}

        {!isMultipleSelect ? (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              setIsMultipleSelect(true);
              setSelectedImage(null);
            }}
          >
            Select media items
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              setIsMultipleSelect(false);
              setSelectedMultipleImages([]);
            }}
          >
            <X size={18} />
            Cancel media selection
          </Button>
        )}
      </div>
      <div className="mt-5 flex justify-between rounded-xl border">
        <ScrollArea className="h-[81vh]">
          <div className="flex justify-center lg:justify-start flex-wrap gap-5 2xl:gap-7 p-2 lg:p-5 2xl:p-7">
            {!isMultipleSelect ? (
              <ImageUploadModal
                handleImageSubmit={handleImageSubmit}
                showImageModal={showImageModal}
                setShowImageModal={setShowImageModal}
                imageSubmitting={imageSubmitting}
              >
                <button
                  type="button"
                  className="size-[105px] lg:size-[180px] 2xl:size-[280px] rounded-md bg-gray-100 dark:bg-custom-gray4 flex justify-center items-center"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <span>
                      <IconPaperPlus />
                    </span>
                    <p>Upload Image</p>
                  </div>
                </button>
              </ImageUploadModal>
            ) : (
              <button
                type="button"
                disabled
                className="size-[105px] lg:size-[180px] 2xl:size-[280px] rounded-md bg-gray-100 dark:bg-custom-gray4 flex justify-center items-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <div className="flex flex-col lg:flex-row items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                  <span>
                    <IconPaperPlus />
                  </span>
                  <p>Upload Image</p>
                </div>
              </button>
            )}

            {medias.map((media) => (
              <div
                key={media.id}
                className={`relative size-[105px] lg:size-[180px] 2xl:size-[282px] rounded-md overflow-hidden cursor-pointer`}
                onClick={() => handleImageClick(media)}
              >
                <Image
                  src={media.imageUrl}
                  alt={media.altText}
                  sizes="282px"
                  fill
                  className="object-cover rounded-md border border-border"
                />

                {isMultipleSelect && (
                  <div
                    className={`absolute inset-0 rounded-md border-[6px] ${
                      selectedMultipleImages.some(
                        (selectedMedia) => selectedMedia === media.id
                      )
                        ? "border-cyan-400"
                        : "border-transparent"
                    }`}
                  >
                    <div className="absolute top-0 right-0">
                      {selectedMultipleImages.some(
                        (selectedMedia) => selectedMedia === media.id
                      ) ? (
                        <span className="size-6 flex justify-center items-center bg-cyan-400 border border-white text-white">
                          <IconTick />
                        </span>
                      ) : (
                        <div className="size-6 bg-gray-100 border border-cyan-400" /> // Empty box of the same size as IconTick
                      )}
                    </div>
                  </div>
                )}

                {selectedImage?.id === media.id && (
                  <div className="absolute inset-0 border-[6px] border-cyan-400 rounded-md">
                    <div className="absolute top-0 right-0 size-6 flex justify-center items-center bg-cyan-400 border border-white text-white">
                      <IconTick />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {!isMultipleSelect && selectedImage && (
          <div className="border-l border-border">
            <MediaDetails
              key={selectedImage.id}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>
        )}
      </div>

      <DeleteModal
        showDeleteModal={showMultipleDeleteModal}
        setShowDeleteModal={setShowMultipleDeleteModal}
        handleDelete={handleMultipleDelete}
        isPending={isMultipleDeleting}
        title={`Do you want to delete ${selectedMultipleImages.length} media ${
          selectedMultipleImages.length > 1 ? "items" : "item"
        }?`}
      />
    </div>
  );
}
