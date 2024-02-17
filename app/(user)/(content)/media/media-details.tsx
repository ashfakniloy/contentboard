import type { Media } from "@prisma/client";
import { useRef, useState } from "react";
import MediaForm from "./media-form";
import MediaDelete from "./media-delete";
import { getFormattedDate } from "@/utils/get-formatte-date";
import { ArrowRight } from "lucide-react";

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
    <div className="w-[250px] lg:w-[400px] 2xl:w-[625px] relative">
      <button
        type="button"
        className="absolute top-2 left-2 lg:left-6"
        onClick={() => setSelectedImage(null)}
      >
        <ArrowRight />
      </button>
      <div className="px-2 pt-7 pb-2 lg:px-5 lg:pt-7 lg:pb-5 2xl:px-7 2xl:pt-10 2xl:pb-7 border-b ">
        <div className=" flex justify-between items-center">
          <p className="text-lg lg:text-[20px] font-medium text-gray-600 dark:text-gray-300">
            Image Details
          </p>
          <MediaDelete
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            imageTitleState={imageTitleState}
          />
        </div>
        <div className="mt-3 flex flex-col lg:flex-row lg:items-center gap-5">
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

      <div className="p-2 lg:p-5 2xl:p-7 pb-[50px] lg:pb-[140px] w-full lg:w-[80%]">
        <MediaForm
          key={selectedImage.id}
          selectedImage={selectedImage}
          setImageTitleState={setImageTitleState}
        />
      </div>
    </div>
  );
}
