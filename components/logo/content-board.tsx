import Image from "next/image";
import { cn } from "@/lib/utils";
import ContentBoardImage from "@/public/images/logo-contentboard.png";

export default function ContentBoardLogo({
  className,
}: {
  className?: string;
}) {
  return (
    <Image
      src={ContentBoardImage}
      alt="contentboard logo"
      className={cn(className)}
    />
  );
}
