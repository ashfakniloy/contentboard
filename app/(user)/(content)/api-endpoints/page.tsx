import type { Metadata } from "next";
import { getAuthSession } from "@/lib/next-auth";
import ApiAlert from "@/components/alerts/api-alert";
import CssAlert from "@/components/alerts/css-alert";
import { BASE_URL } from "@/config";

export const metadata: Metadata = {
  title: "API endpoints",
};

export default async function ApiUrlsPage() {
  const session = await getAuthSession();

  if (!session) return;
  const isUser = session.user.role === "USER";
  const userId = isUser ? session.user.id : "........................";

  const url = `${BASE_URL}/api/${userId}`;
  const cssUrl = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ashfakniloy/contentboard/public/styles/blog.min.css" />`;

  const messageValues = [
    {
      name: "name",
      type: "string",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "phoneNumber",
      type: "string",
      optional: true,
    },
    {
      name: "subject",
      type: "string",
      optional: true,
    },
    {
      name: "message",
      type: "string",
    },
  ];

  const singleBlogInfo =
    "Make sure to pass headers in request to add unique views. Since you will be using SSR, you must manually include headers from your client-side request to the server-side GET request";

  return (
    <div className="space-y-10">
      <div>
        <p className="text-2xl font-bold mb-2">All Blogs</p>
        <ApiAlert title="GET" path={`${url}/blogs`} isUser={isUser} />
      </div>

      <div>
        <p className="text-2xl font-bold mb-2">Single Blog</p>
        <ApiAlert
          title="GET"
          path={`${url}/blogs/{slug}`}
          isUser={isUser}
          info={singleBlogInfo}
        />
      </div>

      <div>
        <p className="text-2xl font-bold mb-2">Blog Styling</p>
        <CssAlert cssUrl={cssUrl} />
      </div>

      <div>
        <p className="text-2xl font-bold mb-2">All Categories</p>
        <ApiAlert title="GET" path={`${url}/categories`} isUser={isUser} />
      </div>

      <div>
        <p className="text-2xl font-bold mb-2">Submit Message</p>
        <ApiAlert
          title="POST"
          path={`${url}/messages`}
          values={messageValues}
          isUser={isUser}
        />
      </div>
    </div>
  );
}
