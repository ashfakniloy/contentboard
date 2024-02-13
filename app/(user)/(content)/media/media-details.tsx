import type { Media } from "@prisma/client";
import { useRef, useState } from "react";
import MediaForm from "./media-form";
import MediaDelete from "./media-delete";
import { getFormattedDate } from "@/utils/get-formatte-date";

type ImageSize = {
  width: number;
  height: number;
};

export default function MediaDetails({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: Media;
  setSelectedImage: React.Dispatch<React.SetStateAction<Media | null>>;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [imageTitleState, setImageTitleState] = useState(
    selectedImage.imageTitle
  );

  const handleImageLoad = () => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setImageSize({ width: naturalWidth, height: naturalHeight });
    }
  };

  return (
    <div className="w-[400px] 2xl:w-[625px]">
      <div className="pt-4 p-5 2xl:p-7 border-b border-border">
        <div className="flex justify-between items-center">
          <p className="text-[20px] font-medium text-gray-600 dark:text-gray-300">
            Image Details
          </p>
          <MediaDelete
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            imageTitleState={imageTitleState}
          />
        </div>
        <div className="mt-3 flex items-center gap-5">
          <div className="max-w-[200px] 2xl:max-w-[320px] max-h-[380px] overflow-hidden">
            <img
              key={selectedImage.id}
              ref={imageRef}
              src={selectedImage.imageUrl}
              alt={selectedImage.altText}
              onLoad={handleImageLoad}
            />
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-300 leading-6">
            <p className="font-semibold">{imageTitleState}</p>
            <p>{getFormattedDate(selectedImage.createdAt)}</p>
            <p>
              {imageSize?.width} x {imageSize?.height}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 2xl:p-7 pb-[140px] w-[80%]">
        <MediaForm
          key={selectedImage.id}
          selectedImage={selectedImage}
          setImageTitleState={setImageTitleState}
        />
      </div>
    </div>
  );
}
