import { getAuthSession } from "@/lib/next-auth";
import { BASE_URL } from "@/config";
import ApiAlert from "@/components/alerts/api-alert";
import CssAlert from "@/components/alerts/css-alert";

export default async function EndPoints() {
  const session = await getAuthSession();

  if (!session) return;
  const isUser = session.user.role === "USER";
  const userId = isUser ? session.user.id : "........................";

  const url = `${BASE_URL}/api/${userId}`;

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
        <CssAlert
          title="CSS"
          path={`${BASE_URL}/_next/static/css/488ef1a06c0ef557.css`}
        />
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
