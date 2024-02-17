import { useState } from "react";
import Image from "next/image";
import { IconTick } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Media } from "@prisma/client";
import { MediaProps } from "@/schemas/media-schema";
import useFetchData from "@/hooks/use-fetch-data";
import { SpinnerContent } from "@/components/spinner";

type ImageLibraryProps = {
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageSubmit: (imageValues: MediaProps) => void;
};

export default function ImageLibrary({
  setShowImageModal,
  handleImageSubmit,
}: ImageLibraryProps) {
  const [selectedImage, setSelectedImage] = useState<null | Media>(null);

  const { data, isLoading, error } = useFetchData("/api/medias");
  const medias: Media[] = data;

  const handleImageClick = (media: Media) => {
    if (selectedImage?.id === media.id) {
      setSelectedImage(null);
    } else {
      setSelectedImage(media);
    }
  };

  const handleSaveImage = () => {
    if (!selectedImage) return;

    handleImageSubmit(selectedImage);
    setShowImageModal(false);
  };

  if (error) {
    return (
      <div className="absolute w-full h-[90%] flex justify-center items-center text-3xl text-red-600 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <div className="absolute w-full h-[70%] flex justify-center items-center">
          <SpinnerContent />
        </div>
      ) : (
        <>
          {medias.length > 0 ? (
            <>
              <ScrollArea className="h-[350px] 2xl:h-[430px] relative">
                <div className="p-3 grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-5 lg:gap-7 overflow-x-hidden overflow-y-auto">
                  {medias.map((media) => (
                    <div
                      key={media.id}
                      className={`relative size-[100px] lg:size-[150px] rounded-md overflow-hidden cursor-pointer`}
                      onClick={() => handleImageClick(media)}
                    >
                      <Image
                        src={media.imageUrl}
                        alt={media.altText}
                        fill
                        // sizes="150px"
                        className="object-cover border border-gray-200 dark:border-gray-800 rounded-md"
                      />

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
              <Button
                type="button"
                className="ml-3 mt-5 w-[150px]"
                disabled={!selectedImage}
                onClick={handleSaveImage}
              >
                Save
              </Button>
            </>
          ) : (
            <div className="absolute inset-0 flex justify-center items-center">
              <p className="text-2xl font-semibold">No image found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
