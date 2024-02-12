import { Skeleton } from "../ui/skeleton";

export default function MessagesCountSkeleton() {
  const items = [...Array(3)];

  return (
    <div className="flex justify-between items-center gap-5">
      {items.map((_, i) => (
        <Skeleton
          key={i}
          className="h-[90px] 2xl:h-[100px] w-full rounded-2xl"
        />
      ))}
    </div>
  );
}
