import type { Media } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { DeleteModal } from "@/components/modals/delete-modal";
import { Button } from "@/components/ui/button";
import { deleteMedia } from "@/db/user/mutations/delete-media";

export default function MediaDelete({
  imageTitleState,
  selectedImage,
  setSelectedImage,
}: {
  imageTitleState: string;
  selectedImage: Media;
  setSelectedImage: React.Dispatch<React.SetStateAction<Media | null>>;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // console.log("delete id", category.id);
    setIsDeleting(true);

    const result = await deleteMedia({ mediaId: selectedImage.id });

    // console.log("result", result);

    if (result?.success) {
      toast.success(result.success);
      setSelectedImage(null);
    } else if (result?.error) {
      toast.error(result.error);
    } else {
      toast.error("Error");
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        type="button"
        onClick={() => setShowDeleteModal(true)}
      >
        <Trash2 size={20} className="mr-1.5" />
        Delete
      </Button>

      <DeleteModal
        key={selectedImage.id}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        title={`Do you want to delete "${imageTitleState}"?`}
        handleDelete={handleDelete}
        isPending={isDeleting}
      />
    </div>
  );
}
