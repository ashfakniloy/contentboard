import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

function NotFoundPage() {
  return (
    <div className="flex justify-center my-[200px] ">
      <p className="text-2xl text-red-700 ">Page not found</p>
    </div>
  );
}

export default NotFoundPage;
