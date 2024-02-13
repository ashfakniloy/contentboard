import type { Metadata } from "next";
import MediaGallery from "./media-gallery";
import { getAuthSession } from "@/lib/next-auth";
import { getMedias } from "@/db/user/queries/get-medias";

export const metadata: Metadata = {
  title: "Media",
};

export default async function MediaPage() {
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
