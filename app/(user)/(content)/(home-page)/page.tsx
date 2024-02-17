import type { Metadata } from "next";
import MessagesCount from "./messages-count";
import { getAuthSession } from "@/lib/next-auth";
import { getMessagesCount } from "@/db/user/queries/get-messages-count";
import { getBlogViews } from "@/db/user/queries/get-blog-views";
import BlogViewsChart from "./blog-views-chart";
import BlogViewportChart from "./blog-viewport-chart";
import { getBlogViewports } from "@/db/user/queries/get-blog-viewports";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function HomePage({
  searchParams: { viewsYear, totalViews },
}: {
  searchParams: { viewsYear: string; totalViews: string };
}) {
  const session = await getAuthSession();

  if (!session) return;
  const userId = session.user.id;

  const { todayCount, thisMonthCount, totalCount } = await getMessagesCount({
    userId,
  });

  const currentYear = new Date().getFullYear();

  const yearBlogViews = Number(viewsYear) || currentYear;
  const yearViewportViews = Number(totalViews);

  const { blogViews, firstBlogYear } = await getBlogViews({
    userId,
    year: yearBlogViews,
  });

  const { viewportsData } = await getBlogViewports({
    userId,
    year: yearViewportViews,
  });

  // console.log("firstBlogYear", firstBlogYear);

  return (
    <div className="space-y-10 lg:space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <BlogViewsChart viewsData={blogViews} firstYear={firstBlogYear} />
        </div>

        <div className="col-span-1">
          <BlogViewportChart
            viewsData={viewportsData}
            firstYear={firstBlogYear}
          />
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold mb-4">Messages</p>
        <MessagesCount
          todayCount={todayCount}
          thisMonthCount={thisMonthCount}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}
