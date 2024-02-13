import { getMessagesCount } from "@/db/user/queries/get-messages-count";
import { getAuthSession } from "@/lib/next-auth";

export default async function MessagesCount() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const session = await getAuthSession();

  if (!session) return;

  const userId = session.user.id;

  const { todayCount, thisMonthCount, totalCount } = await getMessagesCount({
    userId,
  });

  const messagesCount = [
    {
      name: "Today",
      count: todayCount,
    },
    {
      name: "This Month",
      count: thisMonthCount,
    },
    {
      name: "Total",
      count: totalCount,
    },
  ];

  return (
    <>
      {messagesCount && (
        <div className="flex justify-between items-center gap-5">
          {messagesCount.map((message) => (
            <div
              key={message.name}
              className="h-[90px] 2xl:h-[100px] w-full flex justify-center items-center gap-3 rounded-2xl text-white bg-primary"
            >
              <span className="text-[25px] font-bold">{message.count}</span>
              <span className="text-xl">{message.name}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
