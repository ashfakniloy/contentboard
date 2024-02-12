// "use client";

// import { useState } from "react";
// import { IconPaperPlus, IconTick } from "@/components/icons";
// import ImageUploadModal from "@/components/modals/image-upload-modal";
// import { Media } from "@prisma/client";
// import { MediaProps } from "@/schemas/media-schema";
// import Image from "next/image";
// import { toast } from "sonner";
// import MediaDetails from "./media-details";
// import { addMedia } from "@/db/user/mutations/add-media";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";

// export default function MediaGallery({ medias }: { medias: Media[] }) {
//   const [selectedImage, setSelectedImage] = useState<Media | null>(null);
//   const [selectedMultipleImages, setSelectedMultipleImages] = useState<Media[]>(
//     []
//   );

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [isMultipleSelect, setIsMultipleSelect] = useState(false);

//   const [imageSubmitting, setImageSubmitting] = useState(false); // will change

//   const handleImageClick = (media: Media) => {
//     if (selectedImage?.id === media.id) {
//       setSelectedImage(null);
//     } else {
//       setSelectedImage(media);
//     }
//   };

//   const handleImageSubmit = async (imageValues: MediaProps) => {
//     // console.log("imageValues", imageValues);
//     setImageSubmitting(true);

//     const result = await addMedia({ values: imageValues });

//     console.log("result", result);

//     if (result.success) {
//       toast.success(result.success);
//       setShowImageModal(false);
//     } else if (result.error) {
//       toast.error(result.error);
//     } else {
//       toast.error("Error");
//     }

//     setImageSubmitting(false);
//   };

//   return (
//     <div className="">
//       <div className="flex justify-end">
//         <Button
//           variant="outline"
//           onClick={() => setIsMultipleSelect(!isMultipleSelect)}
//           className="h-8 px-3 text-xs lg:text-sm font-normal"
//         >
//           {!isMultipleSelect ? "Select medias" : "Cancel media selection"}
//         </Button>
//       </div>
//       <div className="mt-5 flex justify-between rounded-xl border border-gray-300">
//         <ScrollArea className="h-[81vh]">
//           <div className="flex flex-wrap gap-5 2xl:gap-7 p-5 2xl:p-7">
//             <ImageUploadModal
//               // medias={medias}
//               handleImageSubmit={handleImageSubmit}
//               showImageModal={showImageModal}
//               setShowImageModal={setShowImageModal}
//               imageSubmitting={imageSubmitting}
//             >
//               <button
//                 type="button"
//                 className="size-[180px] 2xl:size-[280px] rounded-md border-gray-400 bg-gray-100 flex justify-center items-center"
//               >
//                 <div className="flex items-center gap-1.5 text-sm text-gray-600">
//                   <span>
//                     <IconPaperPlus />
//                   </span>
//                   <p>Upload Image</p>
//                 </div>
//               </button>
//             </ImageUploadModal>

//             {medias.map((media) => (
//               <div
//                 key={media.id}
//                 className={`relative size-[180px] 2xl:size-[282px] rounded-md overflow-hidden cursor-pointer`}
//                 onClick={() => handleImageClick(media)}
//               >
//                 <Image
//                   src={media.imageUrl}
//                   alt={media.altText}
//                   sizes="282px"
//                   fill
//                   className="object-cover rounded-md border border-gray-200"
//                 />

//                 {selectedImage?.id === media.id && (
//                   <div className="absolute inset-0 border-[6px] border-cyan-400 rounded-md">
//                     <div className="absolute top-0 right-0 size-6 flex justify-center items-center bg-cyan-400 border border-white text-white">
//                       <IconTick />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </ScrollArea>

//         {!isMultipleSelect && selectedImage && (
//           <div className="border-l border-gray-300">
//             <MediaDetails
//               key={selectedImage.id}
//               selectedImage={selectedImage}
//               setSelectedImage={setSelectedImage}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { IconPaperPlus, IconTick } from "@/components/icons";
import ImageUploadModal from "@/components/modals/image-upload-modal";
import { Media } from "@prisma/client";
import { MediaProps } from "@/schemas/media-schema";
import Image from "next/image";
import { toast } from "sonner";
import MediaDetails from "./media-details";
import { addMedia } from "@/db/user/mutations/add-media";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "@/components/modals/delete-modal";
import { Trash2, X, XSquare } from "lucide-react";
import { deleteMedia } from "@/db/user/mutations/delete-media";

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
    // if (isMultipleSelect) {
    //   toggleSelectedImage(media);
    // } else {
    //   setSelectedImage(media);
    // }
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
    <div className="">
      <div className="flex justify-end gap-4">
        {selectedMultipleImages.length > 0 && (
          <Button
            // variant="outline"
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
            // variant="outline"
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
            // variant="outline"
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
      <div className="mt-5 flex justify-between rounded-xl border border-gray-300">
        <ScrollArea className="h-[81vh]">
          <div className="flex flex-wrap gap-5 2xl:gap-7 p-5 2xl:p-7">
            {!isMultipleSelect ? (
              <ImageUploadModal
                handleImageSubmit={handleImageSubmit}
                showImageModal={showImageModal}
                setShowImageModal={setShowImageModal}
                imageSubmitting={imageSubmitting}
              >
                <button
                  type="button"
                  className="size-[180px] 2xl:size-[280px] rounded-md border-gray-400 bg-gray-100 flex justify-center items-center"
                >
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
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
                className="size-[180px] 2xl:size-[280px] rounded-md border-gray-400 bg-gray-100  flex justify-center items-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
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
                className={`relative size-[180px] 2xl:size-[282px] rounded-md overflow-hidden cursor-pointer`}
                onClick={() => handleImageClick(media)}
              >
                <Image
                  src={media.imageUrl}
                  alt={media.altText}
                  sizes="282px"
                  fill
                  className="object-cover rounded-md border border-gray-200"
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
          <div className="border-l border-gray-300">
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
