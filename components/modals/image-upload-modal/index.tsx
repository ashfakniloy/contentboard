import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ImageUploadContent from "./image-upload-content";
import { MediaProps } from "@/schemas/media-schema";

type ImageUploadModalProps = {
  children: React.ReactNode;
  withLibrary?: boolean;
  showImageModal: boolean;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageSubmit: (imageValues: MediaProps) => void;
  imageSubmitting?: boolean;
};

export default function ImageUploadModal({
  children,
  withLibrary,
  showImageModal,
  setShowImageModal,
  handleImageSubmit,
  imageSubmitting,
}: ImageUploadModalProps) {
  return (
    <AlertDialog open={showImageModal} onOpenChange={setShowImageModal}>
      <AlertDialogTrigger asChild className="outline-gray-300">
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="lg:min-w-[765px] 2xl:min-w-[950px] rounded-xl bg-card">
        <ImageUploadContent
          setShowImageModal={setShowImageModal}
          withLibrary={withLibrary}
          handleImageSubmit={handleImageSubmit}
          imageSubmitting={imageSubmitting}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
