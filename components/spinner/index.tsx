import { cn } from "@/lib/utils";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <>
      <span
        role="status"
        className={cn(
          "inline-block size-6 animate-spin rounded-full border-4 border-solid border-gray-100 border-r-gray-100/30 border-b-gray-100/30",
          className
        )}
      ></span>
      <span className="sr-only">Loading...</span>
    </>
  );
};

export const SpinnerPage = ({ className }: { className?: string }) => {
  return (
    <div className="h-[81.1vh] flex justify-center items-center">
      <span
        role="status"
        className={cn(
          "inline-block size-20 animate-spin rounded-full border-[6px] border-solid border-primary border-r-primary/30 border-b-primary/30",
          className
        )}
      ></span>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SpinnerContent = ({ className }: { className?: string }) => {
  return (
    <div className="mt-32 flex justify-center items-center">
      <span
        role="status"
        className={cn(
          "inline-block size-20 animate-spin rounded-full border-[6px] border-solid border-primary border-r-primary/30 border-b-primary/30",
          className
        )}
      ></span>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
