import { useRef, useState } from "react";

import { getFormattedDate } from "@/utils/get-formatte-date";
import { Media } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import MediaForm from "./media-form";
import MediaDelete from "./media-delete";

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
  // const imageRef = useRef();
  // const [imageSize, setImageSize] = useState(null);

  // const [imageTitleState, setImageTitleState] = useState(
  //   selectedImage.imageTitle
  // );

  // const handleImageLoad = () => {
  //   const { naturalWidth, naturalHeight } = imageRef.current;
  //   setImageSize({ width: naturalWidth, height: naturalHeight });
  // };

  const imageRef = useRef<HTMLImageElement>(null); // Provide a type for useRef
  const [imageSize, setImageSize] = useState<ImageSize | null>(null); // Define type for imageSize state
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
    // <ScrollArea className="h-screen w-[400px] 2xl:w-[625px]">
    <div className="w-[400px] 2xl:w-[625px]">
      <div className="pt-4 p-5 2xl:p-7 border-b border-gray-300">
        <div className="flex justify-between items-center">
          <p className="text-[20px] font-medium text-gray-600">Image Details</p>
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

          <div className="text-sm text-gray-500 leading-6">
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
          // id={selectedImage._id}
          // imageTitle={selectedImage.imageTitle}
          // altText={selectedImage.altText}
          selectedImage={selectedImage}
          setImageTitleState={setImageTitleState}
        />
      </div>
    </div>
  );
}
