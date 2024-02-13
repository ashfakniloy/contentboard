import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ImageUploadContent from "./image-upload-content";
import { MediaProps } from "@/schemas/media-schema";
import type { Media } from "@prisma/client";

type ImageUploadModalProps = {
  children: React.ReactNode;
  // medias: Media[];
  withLibrary?: boolean;
  showImageModal: boolean;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  // isLogo: boolean,
  handleImageSubmit: (imageValues: MediaProps) => void;
  imageSubmitting?: boolean;
};

export default function ImageUploadModal({
  children,
  // medias,
  withLibrary,
  showImageModal,
  setShowImageModal,
  // isLogo,
  handleImageSubmit,
  imageSubmitting,
}: ImageUploadModalProps) {
  return (
    <AlertDialog open={showImageModal} onOpenChange={setShowImageModal}>
      <AlertDialogTrigger asChild className="outline-gray-300">
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-[765px] 2xl:min-w-[950px] rounded-xl bg-card">
        <ImageUploadContent
          // medias={medias}
          setShowImageModal={setShowImageModal}
          withLibrary={withLibrary}
          // isLogo={isLogo}
          handleImageSubmit={handleImageSubmit}
          imageSubmitting={imageSubmitting}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
