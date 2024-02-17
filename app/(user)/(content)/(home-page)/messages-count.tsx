export default function MessagesCount({
  todayCount,
  thisMonthCount,
  totalCount,
}: {
  todayCount: number;
  thisMonthCount: number;
  totalCount: number;
}) {
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
    <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
      {messagesCount.map((message) => (
        <div
          key={message.name}
          className="h-[90px] 2xl:h-[100px] w-full flex justify-center items-center gap-3 rounded-2xl bg-primary/15"
        >
          <span className="text-[25px] font-bold">{message.count}</span>
          <span className="text-xl">{message.name}</span>
        </div>
      ))}
    </div>
  );
}
