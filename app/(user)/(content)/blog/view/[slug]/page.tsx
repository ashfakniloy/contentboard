import { Suspense } from "react";
import UserHeader from "../../../_layout/header";
import SingleBlog from "./single-blog";
import { SpinnerSuspense } from "@/components/spinner";

export default function BlogViewpage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <UserHeader heading="Blog View" />
      <Suspense fallback={<SpinnerSuspense />}>
        <SingleBlog params={params} />
      </Suspense>
    </div>
  );
}
