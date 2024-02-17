import type { Metadata } from "next";
import { getAuthSession } from "@/lib/next-auth";
import { getMessages } from "@/db/user/queries/get-messages";
import { DataTable } from "@/components/data-table";
import { messagesColumn } from "./messages-table/messages-column";
import { deleteMessage } from "@/db/user/mutations/delete-message";

export const metadata: Metadata = {
  title: "Messages",
};

export default async function MessagePage({
  searchParams: { limit, page, search, sort },
}: {
  searchParams: SearchParams;
}) {
  const session = await getAuthSession();

  if (!session) return;
  const userId = session?.user.id;

  const limitNumber = Number(limit);
  const pageNumber = Number(page);

  const sortValues = sort?.split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  const { messages, messagesCount } = await getMessages({
    userId,
    sortBy,
    orderBy,
    limitNumber,
    pageNumber,
    username: search,
  });

  // console.log("messagesCount", messagesCount);

  // if (!messages.length) {
  //   return (
  //     <p className="mt-20 text-xl text-center font-bold text-red-500">
  //       No messages found
  //     </p>
  //   );
  // }

  return (
    <div>
      <p className="text-2xl font-bold my-5">All Messages</p>

      {messages && (
        <DataTable
          columns={messagesColumn}
          data={messages}
          searchBy="username"
          count={messagesCount}
          deleteAction={deleteMessage}
          manualControl
        />
      )}
    </div>
  );
}
