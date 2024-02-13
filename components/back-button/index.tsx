"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={cn(
        "font-medium flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:underline",
        className
      )}
      onClick={() => router.back()}
    >
      <ArrowLeft size={18} />
      <span>Go Back</span>
    </button>
  );
}
