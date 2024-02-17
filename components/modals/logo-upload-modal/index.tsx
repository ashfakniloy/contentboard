import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Cropper from "react-easy-crop";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { changeLogo } from "@/db/user/mutations/change-logo";
import { Spinner } from "@/components/spinner";
import { Slider } from "@/components/ui/slider";
import { getCroppedImg } from "./canvasUtils";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/config";

// const ORIENTATION_TO_ANGLE = {
//   '3': 180,
//   '6': 90,
//   '8': -90,
// }

export default function LogoUploadModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const imageMaxSize = 800;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    width: number;
    height: number;
    x: number;
    y: number;
  }>(null);

  const [imageUploading, setImageUploading] = useState(false);
  const [showResizeModal, setShowResizeModal] = useState(false);

  const { data: session, update } = useSession();
  const isUser = session?.user.role === "USER";

  const router = useRouter();

  useEffect(() => {
    imageSrc && setShowResizeModal(true);
  }, [imageSrc]);

  const closeModal = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    // setRotation(0);
    setZoom(1);
    setCroppedAreaPixels(null);
    setShowResizeModal(false);
  };

  const onCropComplete = (
    croppedArea: { width: number; height: number; x: number; y: number },
    croppedAreaPixels: { width: number; height: number; x: number; y: number }
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  function readFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    e.preventDefault();

    const image = e.target.files[0];

    if (image.size > imageMaxSize * 1024) {
      console.log(`Image size exceeds the limit, use under ${imageMaxSize}KB`);
      toast.error(`Image size exceeds the limit, use under ${imageMaxSize}KB`);
      return;
    }

    const imageDataUrl = await readFile(image);

    setImageSrc(imageDataUrl as string);
  };

  const handleImageSubmit = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    if (!isUser) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
        // rotation
      );

      if (!croppedImage) return;

      const formData = new FormData();
      formData.append("file", croppedImage);
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
          const values = {
            logoId: data.public_id,
            logoUrl: data.secure_url,
          };

          const result = await changeLogo({ values });

          // console.log("result", result);

          if (result.success) {
            toast.success(result.success);

            await update({
              ...session,
              user: {
                ...session?.user,
                logoUrl: result.data.logoUrl,
              },
            });

            router.refresh();

            closeModal();
          } else {
            console.log("error", data);
            closeModal();
            toast.error("Image upload failed, try again");
          }
        }
      } catch (error) {
        console.log("error", error);
        closeModal();
        toast.error("Image upload failed, try again");
      }

      setImageUploading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {!imageSrc && (
        <>
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            className="hidden"
          />

          <label htmlFor="image" className="cursor-pointer">
            {children}
          </label>
        </>
      )}

      {showResizeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-card border w-[550px] p-10 rounded-lg text-foreground">
            <p className="text-center text-3xl font-bold">Add Logo</p>
            <div className="mt-5 relative w-full h-[300px]">
              {imageSrc && (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  // rotation={rotation}
                  zoom={zoom}
                  aspect={160 / 100}
                  onCropChange={setCrop}
                  // onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  zoomSpeed={0.1}
                />
              )}
            </div>
            <div className="mt-5 flex items-center gap-3">
              <p className="font-medium">Zoom:</p>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.01}
                aria-labelledby="Zoom"
                onValueChange={([zoom]) => setZoom(zoom)}
              />
            </div>
            <div className="mt-5 flex gap-5">
              <Button
                type="button"
                variant="outline"
                onClick={closeModal}
                className="w-full bg-transparent"
                disabled={imageUploading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleImageSubmit}
                className="w-full relative"
                disabled={imageUploading}
              >
                {imageUploading && <Spinner className="absolute left-8" />}
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
