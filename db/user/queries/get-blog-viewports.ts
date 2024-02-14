import { prisma } from "@/lib/prisma";

export async function getBlogViewports({
  userId,
  year,
}: {
  userId: string;
  year?: number;
}) {
  let data;

  if (year) {
    const startDate = new Date(0);
    startDate.setFullYear(year);
    const endDate = new Date(0);
    endDate.setFullYear(year + 1);

    const viewports = await prisma.blogView.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        viewport: true,
      },
    });

    data = viewports;
  } else {
    const viewports = await prisma.blogView.findMany({
      where: {
        userId: userId,
      },
      select: {
        viewport: true,
      },
    });

    data = viewports;
  }

  const mobileViews = data.filter((view) => view.viewport === "mobile").length;
  const desktopViews = data.filter(
    (view) => view.viewport === "desktop"
  ).length;

  const viewportsData = [
    {
      name: "Desktop",
      value: desktopViews,
    },
    {
      name: "Mobile",
      value: mobileViews,
    },
  ];

  // console.log("viewportsData", viewportsData);

  return { viewportsData };
}
