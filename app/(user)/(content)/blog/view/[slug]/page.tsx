import Image from "next/image";
import { notFound } from "next/navigation";
import parser from "html-react-parser";
import { ClientFormattedDate } from "@/components/formats/client-formatted-date";
import BackButton from "@/components/back-button";
import { getAuthSession } from "@/lib/next-auth";
import { getSingleBlog } from "@/db/user/queries/get-single-blog";
import "@/public/styles/blog.css";

export default async function BlogViewpage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const session = await getAuthSession();
  if (!session) return;

  const userId = session.user.id;

  const decodedSlug = decodeURIComponent(slug);

  const { blog } = await getSingleBlog({ decodedSlug, userId });

  // console.log("blog", blog);

  if (!blog) {
    notFound();
  }

  return (
    <div className="lg:flex lg:justify-center">
      <div className="lg:w-[1000px]">
        <div className="flex justify-between">
          <BackButton />
          {blog.published ? (
            <span className="px-3 py-1 rounded-full text-sm font-bold text-white bg-blue-600">
              Published
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-sm font-bold text-white bg-red-600">
              Draft
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {blog.categories.map((categoty, i) => (
            <span
              key={i}
              className="px-2 py-1 border border-gray-400 text-xs font-medium rounded-full"
            >
              {categoty}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-2xl lg:text-4xl font-bold">{blog.title}</h1>

        <p className="mt-2 capitalize">Author: {blog.author}</p>

        <div className="mt-2 flex flex-col lg:flex-row lg:items-center text-sm">
          <p>
            <span>Published: </span>
            <ClientFormattedDate date={blog.createdAt} />
          </p>

          {blog.createdAt < blog.updatedAt && (
            <p>
              <span className="px-4 hidden lg:inline-block">|</span>
              <span>Updated: </span>
              <ClientFormattedDate date={blog.updatedAt} />
            </p>
          )}
        </div>

        <div className="mt-5 relative h-[280px] lg:h-[660px]">
          <Image
            src={blog.featuredImage.imageUrl}
            alt={blog.featuredImage.altText}
            title={blog.featuredImage.imageTitle}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        <div className="mt-6">{parser(blog.body)}</div>
      </div>
    </div>
  );
}
