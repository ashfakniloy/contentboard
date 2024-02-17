import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Message } from "@prisma/client";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { ClientFormattedDate } from "../formats/client-formatted-date";

type MessageModalProps = {
  showMessageModal: boolean;
  setShowMessageModal: (arg: boolean) => void;
  message: Message;
};

export function MessageModal({
  showMessageModal,
  setShowMessageModal,
  message,
}: MessageModalProps) {
  const messageInfos = [
    {
      name: "Username",
      data: message.username,
    },
    {
      name: "Email",
      data: (
        <a
          href={`mailto:${message.email}`}
          className="hover:underline hover:text-blue-500"
        >
          {message.email}
        </a>
      ),
    },
    {
      name: "Phone number",
      data: message.phoneNumber ? (
        <a
          href={`tel:${message.phoneNumber}`}
          className="hover:underline hover:text-blue-500"
        >
          {message.phoneNumber}
        </a>
      ) : (
        "Not provided"
      ),
    },
    {
      name: "Date",
      data: <ClientFormattedDate date={message.createdAt} />,
    },
  ];

  return (
    <AlertDialog open={showMessageModal} onOpenChange={setShowMessageModal}>
      <AlertDialogContent className="bg-card min-w-[700px] p-10">
        <AlertDialogCancel className="absolute top-2 right-2">
          <X size={25} />
        </AlertDialogCancel>

        <div className="space-y-1 text-sm">
          {messageInfos.map((messageInfo, i) => (
            <div key={i} className="flex items-center gap-5">
              <p className="w-[140px]">{messageInfo.name}:</p>
              <p className="">{messageInfo.data}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5 text-sm">
          <p className="w-[140px]">Subject:</p>
          <p className="">
            {message.subject ? message.subject : "Not provided"}
          </p>
        </div>

        <div className="mt-2 space-y-1">
          <p className="">Message:</p>
          <p>{message.message}</p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
