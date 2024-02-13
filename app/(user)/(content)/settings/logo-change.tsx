"use client";

import LogoUploadModal from "@/components/modals/logo-upload-modal";
import { Edit } from "lucide-react";
import Image from "next/image";

export default function LogoChange({ logoUrl }: { logoUrl: string | null }) {
  return (
    <div className="">
      <label htmlFor="" className="inline-block mb-4">
        Logo
      </label>
      <div className="relative size-[100px] rounded-full overflow-hidden bg-white">
        {logoUrl ? (
          <Image src={logoUrl} alt="user logo" fill className="object-cover" />
        ) : (
          <p className="mt-7 flex justify-center font-bold text-gray-500">
            Add logo
          </p>
        )}
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-white/70"></div>
        <div className="absolute flex inset-x-0 bottom-2 justify-center items-center text-black">
          {/* <ImageUploadModal
          isLogo
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          handleImageSubmit={handleImageSubmit}
          imageSubmitting={isPending}
        > */}
          <LogoUploadModal>
            <span title="Change logo">
              <Edit />
            </span>
          </LogoUploadModal>
          {/* </ImageUploadModal> */}
        </div>
      </div>
    </div>
  );
}