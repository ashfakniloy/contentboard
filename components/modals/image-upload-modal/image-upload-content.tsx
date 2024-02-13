import { useState } from "react";
import ImageUploadField from "./image-upload-field";
import { IconX } from "@/components/icons";
import ImageLibrary from "./image-library";
import { Media } from "@prisma/client";
import { MediaProps } from "@/schemas/media-schema";

type ImageUploadContentProps = {
  // medias: Media[];
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  withLibrary?: boolean;
  // isLogo: boolean;
  handleImageSubmit: (imageValues: MediaProps) => void;
  imageSubmitting?: boolean;
};

function ImageUploadContent({
  // medias,
  setShowImageModal,
  withLibrary,
  // isLogo,
  handleImageSubmit,
  imageSubmitting,
}: ImageUploadContentProps) {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const imageOptions = ["Upload Your Image", "Choose From Library"];

  const [selectedOption, setSelectedOption] = useState(imageOptions[0]);

  return (
    <div className="">
      <button
        type="button"
        className="absolute right-1.5 top-1.5 rounded-full size-7 flex justify-center items-center border-2 border-gray-500 text-gray-500 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setShowImageModal(false)}
        disabled={imageUploading}
      >
        <IconX />
      </button>

      <div className="text-2xl font-bold text-center">
        <div>
          {!imageUploading && !imageUploaded && (
            <div className="flex justify-center items-center divide-x divide-gray-300 dark:divide-gray-600">
              {withLibrary ? (
                imageOptions.map((option) => (
                  <div key={option} className="px-4">
                    <button
                      type="button"
                      className={`outline-none ${
                        option === selectedOption
                          ? ""
                          : "text-gray-300 dark:text-gray-700"
                      }`}
                      onClick={() => setSelectedOption(option)}
                    >
                      {option}
                    </button>
                  </div>
                ))
              ) : (
                <p>{selectedOption}</p>
              )}
            </div>
          )}

          {imageUploading && <p>Uploading...</p>}
          {imageUploaded && <p>Image Uploaded</p>}

          {/* {imageUploaded && !isLogo && <p>Image Uploaded</p>}
          {isLogo && imageUploaded && <p>Submit logo</p>} */}
        </div>
      </div>

      <div className="mt-4 h-[412px] 2xl:h-[500px] relative">
        {selectedOption === "Upload Your Image" && (
          <ImageUploadField
            imageUploading={imageUploading}
            setImageUploading={setImageUploading}
            setImageUploaded={setImageUploaded}
            setShowImageModal={setShowImageModal}
            // isLogo={isLogo}
            handleImageSubmit={handleImageSubmit}
            imageSubmitting={imageSubmitting}
          />
        )}

        {selectedOption === "Choose From Library" && withLibrary && (
          <ImageLibrary
            // medias={medias}
            setShowImageModal={setShowImageModal}
            handleImageSubmit={handleImageSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default ImageUploadContent;
