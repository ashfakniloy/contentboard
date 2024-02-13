import type { Metadata } from "next";
import { getAuthSession } from "@/lib/next-auth";
import { getMedias } from "@/db/user/queries/get-medias";
import MediaGallery from "./media-gallery";

export const metadata: Metadata = {
  title: "Media",
};

export default async function MediaPage() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const session = await getAuthSession();

  if (!session) return;

  const userId = session?.user.id;
  const { medias, mediasCount } = await getMedias({ userId: userId });

  return (
    <>
      <MediaGallery medias={medias} />
    </>
  );
}
