"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import SectionChart from "@/components/sections/section-chart";
import useWindowSize from "@/hooks/use-window-size";

type ViewsOverviewProps = {
  name: string;
  value: number;
}[];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-4 rounded-lg text-sm font-medium shadow-md">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const RADIAN = Math.PI / 180;
  // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {percent > 0 && `${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CenterLabel = ({
  viewBox,
  viewsData,
  totalSum,
}: {
  viewBox: any;
  viewsData: ViewsOverviewProps;
  totalSum: number;
}) => {
  const { cx, cy } = viewBox;

  return (
    <>
      <text x={cx} y={cy - 35} textAnchor="middle" dominantBaseline="central">
        <tspan
          alignmentBaseline="middle"
          className="text-sm fill-gray-700 dark:fill-gray-300"
        >
          Total Views
        </tspan>
      </text>
      <text x={cx} y={cy - 5} textAnchor="middle" dominantBaseline="central">
        <tspan
          alignmentBaseline="middle"
          className="text-3xl fill-black dark:fill-white font-bold"
        >
          {totalSum}
        </tspan>
      </text>

      <rect
        y={cy + 15}
        x={cx - 64}
        className="w-[130px] h-[1px] fill-none stroke-gray-400 dark:stroke-gray-500"
      />
      {viewsData.map((view, i) => (
        <text
          key={i}
          x={cx}
          y={cy + 35 + i * 22}
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan
            alignmentBaseline="middle"
            className="text-sm fill-black dark:fill-white"
          >
            {view.name}: {view.value}
          </tspan>
        </text>
      ))}
    </>
  );
};

export default function BlogViewportChart({
  firstYear,
  viewsData,
}: {
  firstYear: number;
  viewsData: ViewsOverviewProps;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const windowSize = useWindowSize();

  const newParam = new URLSearchParams(searchParams.toString());

  const handleYear = (value: string) => {
    // console.log("year selected");
    if (value === "All") {
      newParam.delete("totalViews");
      router.replace(`${pathname}?${newParam}`, { scroll: false });
    } else {
      newParam.set("totalViews", value.toString());
      router.replace(`${pathname}?${newParam}`, { scroll: false });
    }
  };

  const totalViews = searchParams?.get("totalViews");
  const currentYear = new Date().getFullYear();

  const selectedYear = totalViews ? Number(totalViews) : "All" || currentYear;

  const COLORS = ["#0088FE", "#00C49F"];

  const totalSum = viewsData.reduce((total, entry) => total + entry.value, 0);

  return (
    <SectionChart
      title="Total Blog Views"
      selectedYear={selectedYear}
      handleYear={handleYear}
      currentYear={currentYear}
      firstYear={firstYear}
      showAllYear
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={400}>
        <PieChart width={800} height={400}>
          {totalSum > 0 ? (
            <Pie
              data={viewsData}
              cx={windowSize === "sm" ? 190 : 230}
              cy={200}
              innerRadius={windowSize === "sm" ? 100 : 140}
              outerRadius={windowSize === "sm" ? 150 : 190}
              labelLine={false}
              label={renderCustomizedLabel}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              className="focus:outline-none"
            >
              <Label
                content={
                  <CenterLabel
                    viewBox
                    viewsData={viewsData}
                    totalSum={totalSum}
                  />
                }
                position="center"
              />
              {viewsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          ) : (
            <Pie
              data={[{ name: "No Data", value: 1 }]}
              cx={windowSize === "sm" ? 190 : 230}
              cy={200}
              innerRadius={windowSize === "sm" ? 100 : 140}
              outerRadius={windowSize === "sm" ? 150 : 190}
              labelLine={false}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              className="focus:outline-none fill-gray-100 dark:fill-gray-950"
            >
              <Label
                content={
                  <CenterLabel
                    viewBox
                    viewsData={viewsData}
                    totalSum={totalSum}
                  />
                }
                position="center"
              />
            </Pie>
          )}
          {totalSum > 0 && (
            // <Tooltip content={<CustomTooltip />} cursor={{ opacity: "70%" }} />
            <Tooltip content={<CustomTooltip />} />
          )}
        </PieChart>
      </ResponsiveContainer>
    </SectionChart>
  );
}
