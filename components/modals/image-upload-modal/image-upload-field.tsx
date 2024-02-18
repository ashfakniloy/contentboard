import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { IconCloudArrow } from "@/components/icons";
import { Spinner } from "@/components/spinner";
import ImageSubmitForm from "./image-submit-form";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/config";
import { MediaProps } from "@/schemas/media-schema";
import { useSession } from "next-auth/react";

type ImageUploadFieldProps = {
  imageUploading: boolean;
  setImageUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageSubmit: (imageValues: MediaProps) => void;
  imageSubmitting?: boolean;
};

export default function ImageUploadField({
  imageUploading,
  setImageUploading,
  setImageUploaded,
  setShowImageModal,
  handleImageSubmit,
  imageSubmitting,
}: ImageUploadFieldProps) {
  const imageMaxSize = 800;
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState("");

  const { data: session } = useSession();
  const isUser = session?.user.role === "USER";

  const handleImageUpload = async () => {
    if (!image) return;

    if (image.size > imageMaxSize * 1024) {
      console.log(`Image size exceeds the limit, use under ${imageMaxSize}KB`);
      toast.error(`Image size exceeds the limit, use under ${imageMaxSize}KB`);
      return;
    }

    if (!isUser) {
      toast.error("Unauthorized");
      return;
    }

    setImagePreview(URL.createObjectURL(image));

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    formData.append("folder", CLOUDINARY_FOLDER);

    setImageUploading(true);

    const cloudinary_url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    try {
      const response = await fetch(cloudinary_url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.secure_url);
        setImageId(data.public_id);
        setImage(null);
        setImageUploaded(true);
      } else {
        console.log("error", data);
        setImage(null);
        setShowImageModal(false);
        toast.error("Image upload failed, try again");
      }
    } catch (error) {
      console.log("error", error);
      setImage(null);
      setShowImageModal(false);
      toast.error("Image upload failed, try again");
    }

    setImageUploading(false);
  };

  useEffect(() => {
    image && handleImageUpload();
  }, [image]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    e.preventDefault();

    const image = e.target.files[0];

    setImage(image);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length > 1) {
      console.log("single image only");
      toast.error("Single image only");
      return;
    }

    const droppedImage = e.dataTransfer.files[0];

    if (droppedImage.size > imageMaxSize * 1024) {
      console.log(`Image size exceeds the limit, use under ${imageMaxSize}KB`);
      toast.error(`Image size exceeds the limit, use under ${imageMaxSize}KB`);
      return;
    }

    setImage(droppedImage);
  };

  return (
    <>
      {!imagePreview ? (
        <div
          className={`h-full flex flex-col justify-center items-center rounded-xl border-2 border-dashed
            text-gray-300 dark:text-gray-500 ${
              dragging
                ? "border-blue-500"
                : "border-gray-300 dark:border-gray-700"
            }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span>
            <IconCloudArrow />
          </span>
          <p className="mt-5 text-xl font-medium">Drag and drop asset here</p>
          <p className="mt-1 text-sm ">{`Image size (Max ${imageMaxSize}kb)`}</p>

          <p className="mt-3 font-medium text-lg text-black dark:text-gray-200">
            Or
          </p>

          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            className="hidden"
          />

          <label
            htmlFor="image"
            className="mt-3 px-4 py-2 rounded-full w-[250px] flex justify-center border border-primary bg-primary hover:bg-primary/90 text-white transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
          >
            Browse
          </label>
        </div>
      ) : (
        <div className="w-full h-full border-2 border-transparent bg-black rounded-lg">
          {imageUploading ? (
            <>
              <Image
                src={imagePreview}
                alt="image uploaded preview"
                fill
                className="object-cover blur-md opacity-50 rounded-lg"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <Spinner className="size-20 border-[6px]" />
              </div>
            </>
          ) : (
            imageUrl && (
              <>
                <Image
                  src={imageUrl}
                  alt="image uploaded result"
                  fill
                  className="object-cover rounded-lg"
                />

                <div className="absolute inset-0 flex justify-center items-center h-full">
                  <div className="w-[330px] px-7 py-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-card">
                    <ImageSubmitForm
                      imageId={imageId}
                      imageUrl={imageUrl}
                      handleImageSubmit={handleImageSubmit}
                      imageSubmitting={imageSubmitting}
                    />
                  </div>
                </div>
              </>
            )
          )}
        </div>
      )}
    </>
  );
}
