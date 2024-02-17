import Lottie from "lottie-react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import deleteLottie from "@/public/lottie/delete-lottie.json";
import { Spinner } from "@/components/spinner";

type DeleteModalProps = {
  showDeleteModal: boolean;
  title: string;
  isPending: boolean;
  handleDelete: () => void;
  setShowDeleteModal: (arg: boolean) => void;
};

export function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  title,
  handleDelete,
  isPending,
}: DeleteModalProps) {
  return (
    <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
      <AlertDialogContent className="w-[626px] p-9 flex flex-col items-center bg-card">
        <div className=" flex flex-col items-center">
          <p className="text-lg font-medium">{title}</p>

          <div className="mt-2 size-[116px]">
            <Lottie animationData={deleteLottie} />
          </div>

          <div className="mt-4 flex justify-center gap-5">
            <Button
              type="button"
              variant="outline"
              className="w-[124px] dark:bg-transparent"
              onClick={() => setShowDeleteModal(false)}
              disabled={isPending}
            >
              No
            </Button>
            <Button
              type="button"
              className="w-[124px] relative"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending && (
                <div className="absolute flex items-center left-3.5">
                  <Spinner className="border-gray-300 border-r-gray-300/30 border-b-gray-300/30" />
                </div>
              )}
              Yes
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
