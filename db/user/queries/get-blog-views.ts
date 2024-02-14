import { prisma } from "@/lib/prisma";

export async function getBlogViews({
  userId,
  year,
}: {
  userId: string;
  year: number;
}) {
  const startDate = new Date(0);
  startDate.setFullYear(year);
  const endDate = new Date(0);
  endDate.setFullYear(year + 1);

  const data = await prisma.blogView.groupBy({
    by: ["createdAt"],

    where: {
      userId: userId,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },

    _count: true,
  });

  // console.log("data", data);

  const blogViews = data.reduce(
    (acc, { createdAt, _count }) => {
      const month = createdAt.getMonth();
      acc[month].total += _count;
      return acc;
    },
    [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ]
  );

  // const viewports = await prisma.blogView.findMany({
  //   where: {
  //     userId: userId,
  //     createdAt: {
  //       gte: startDate,
  //       lt: endDate,
  //     },
  //   },
  //   select: {
  //     viewport: true,
  //   },
  // });

  // const mobileViews = viewports.filter(
  //   (view) => view.viewport === "mobile"
  // ).length;
  // const desktopViews = viewports.filter(
  //   (view) => view.viewport === "desktop"
  // ).length;

  // const viewportsData = [
  //   {
  //     name: "Desktop",
  //     value: desktopViews,
  //   },
  //   {
  //     name: "Mobile",
  //     value: mobileViews,
  //   },
  // ];

  const firstDateEntry = await prisma.blog.findFirst({
    orderBy: { createdAt: "asc" },
    select: {
      createdAt: true,
    },
  });

  const firstBlogYear =
    firstDateEntry?.createdAt.getFullYear() || new Date().getFullYear();

  return { blogViews, firstBlogYear };
}
