import { getMedias } from "@/db/user/queries/get-medias";
import { getAuthSession } from "@/lib/next-auth";
import MediaGallery from "./media-gallery";

export default async function Medias() {
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
