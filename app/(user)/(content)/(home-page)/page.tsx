import type { Metadata } from "next";
import MessagesCount from "./messages-count";
import { getAuthSession } from "@/lib/next-auth";
import { getMessagesCount } from "@/db/user/queries/get-messages-count";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function HomePage() {
  const session = await getAuthSession();

  if (!session) return;
  const userId = session.user.id;

  const { todayCount, thisMonthCount, totalCount } = await getMessagesCount({
    userId,
  });

  return (
    <>
      <div className="">
        <p className="text-2xl font-bold mb-4">Messages</p>

        <MessagesCount
          todayCount={todayCount}
          thisMonthCount={thisMonthCount}
          totalCount={totalCount}
        />
      </div>
    </>
  );
}

// import type { Metadata } from "next";
// import { Suspense } from "react";
// import MessagesCount from "./messages-count";
// import MessagesCountSkeleton from "@/components/skeletons/messages-count-sleleton";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

// export default function HomePage() {
//   return (
//     <>
//       <div className="">
//         <p className="text-2xl font-bold mb-4">Messages</p>
//         <Suspense fallback={<MessagesCountSkeleton />}>
//         <MessagesCount />
//         </Suspense>
//       </div>
//     </>
//   );
// }
