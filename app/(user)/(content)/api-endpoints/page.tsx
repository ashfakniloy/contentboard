import type { Metadata } from "next";
import { getAuthSession } from "@/lib/next-auth";
import ApiAlert from "@/components/alerts/api-alert";
import CssAlert from "@/components/alerts/css-alert";
import { BASE_URL } from "@/config";
import ScriptAlert from "@/components/alerts/script-alert";

export const metadata: Metadata = {
  title: "API endpoints",
};

export default async function ApiUrlsPage() {
  const session = await getAuthSession();

  if (!session) return;
  const isUser = session.user.role === "USER";
  const userId = isUser ? session.user.id : "........................";

  const url = `${BASE_URL}/api/${userId}`;
  const scriptUrl = `${BASE_URL}/api/${userId}/set-device-id`;

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

  return (
    <div className="space-y-10">
      <div className="">
        <p className="text-2xl font-bold mb-2">All Blogs</p>
        <ApiAlert title="GET" path={`${url}/blogs`} isUser={isUser} />
      </div>

      <div className="">
        <p className="text-2xl font-bold mb-2">Single Blog</p>
        <ApiAlert title="GET" path={`${url}/blogs/{slug}`} isUser={isUser} />
      </div>

      <div className="">
        <p className="text-2xl font-bold mb-2">Blog Styling</p>
        <CssAlert />
      </div>

      <div className="">
        <p className="text-2xl font-bold mb-2">Blog View Count</p>
        <ScriptAlert isUser={isUser} scriptUrl={scriptUrl} />
      </div>

      <div className="">
        <p className="text-2xl font-bold mb-2">All Categories</p>
        <ApiAlert title="GET" path={`${url}/categories`} isUser={isUser} />
      </div>

      <div className="">
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
