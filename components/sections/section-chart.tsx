import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function SectionChart({
  title,
  children,
  handleYear,
  selectedYear,
  showAllYear,
  currentYear,
  firstYear,
  className,
}: {
  title: string | JSX.Element;
  children: React.ReactNode;
  handleYear: (value: string) => void;
  selectedYear: string | number;
  currentYear: number;
  firstYear: number;
  showAllYear?: boolean;
  className?: string;
}) {
  let years: (number | string)[] = Array.from(
    { length: currentYear - firstYear + 1 },
    (_, index) => firstYear + index
  );

  if (showAllYear) {
    years = ["All", ...years];
  }

  // console.log("years", years);

  return (
    <div
      className={cn(
        "bg-white border dark:border-custom-gray4 dark:bg-custom-gray4 p-2 lg:p-6 rounded-lg",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold capitalize">{title}</h3>

        <div className="flex items-center gap-3">
          <p>Year:</p>
          <Select value={selectedYear?.toString()} onValueChange={handleYear}>
            <SelectTrigger className="w-[95px]">
              <SelectValue placeholder={selectedYear.toString()} />
            </SelectTrigger>
            <SelectContent className="w-[95px] min-w-0">
              <SelectGroup>
                {years &&
                  years.map((year, i) => (
                    <SelectItem key={i} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">{children}</div>
    </div>
  );
}
