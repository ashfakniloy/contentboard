"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Check, Copy, Info, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Values = {
  name: string;
  type: string;
  optional?: boolean;
};

export default function ApiAlert({
  title,
  path,
  values,
  isUser,
  info,
}: {
  title: string;
  path: string;
  isUser: boolean;
  info?: string;
  values?: Values[];
}) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const isCopiedTimeout = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    return () => clearTimeout(isCopiedTimeout);
  }, [isCopied]);

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("API endpoint copied to clipboard", { duration: 3000 });
    setIsCopied(true);
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <div className="flex items-center justify-between gap-2">
          <div className="w-full lg:w-auto p-1 lg:p-0 overflow-x-auto overflow-y-hidden">
            <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {path}
            </code>
          </div>

          {!isCopied ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Copy"
              onClick={() => onCopy(path)}
            >
              <Copy className="size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Copied to clipboard"
              className="cursor-default hover:bg-transparent"
            >
              <Check className="size-4" />
            </Button>
          )}
        </div>

        {!isUser && (
          <div className="mt-1 flex items-center gap-1.5 text-sm font-medium">
            <Info className="text-gray-500 size-[14px]" />
            {`Create an account to get API`}
          </div>
        )}

        {info && (
          <div className="mt-1 flex lg:items-center gap-1.5">
            <div className="mt-0.5 lg:mt-0">
              <Info className="text-gray-500 size-[16px]" />
            </div>
            <p className="text-sm font-semibold">{info}</p>
          </div>
        )}

        {values && (
          <div className="mt-2">
            <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              values ={` { `}
              <span className="space-x-2">
                {values.map((value, i) => (
                  <span key={i}>
                    {value.name}: {value.type} {value.optional && "(optional)"}
                    {i < values.length - 1 && ","}
                  </span>
                ))}
                {` } `}
              </span>
            </code>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}

// "use client";

// import { toast } from "sonner";
// import { useEffect, useState } from "react";
// import { Check, Copy, Info, Server } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// type Values = {
//   name: string;
//   type: string;
//   optional?: boolean;
// };

// export default function ApiAlert({
//   title,
//   path,
//   values,
//   isUser,
//   info,
// }: {
//   title: string;
//   path: string;
//   isUser: boolean;
//   info?: string;
//   values?: Values[];
// }) {
//   const [isCopied, setIsCopied] = useState(false);

//   useEffect(() => {
//     const isCopiedTimeout = setTimeout(() => {
//       setIsCopied(false);
//     }, 3000);

//     return () => clearTimeout(isCopiedTimeout);
//   }, [isCopied]);

//   const onCopy = (description: string) => {
//     navigator.clipboard.writeText(description);
//     toast.success("API endpoint copied to clipboard", { duration: 3000 });
//     setIsCopied(true);
//   };

//   return (
//     <Alert>
//       <Server className="h-4 w-4" />
//       <AlertTitle >{title}</AlertTitle>
//       <AlertDescription >
//         <div className="w-full flex items-center justify-between">
//           <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-3">
//             <div className="w-full lg:w-auto p-1 lg:p-0 overflow-x-auto overflow-y-hidden">
//               <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
//                 {path}
//               </code>
//             </div>
//             <div className="lg:hidden">
//               {!isCopied ? (
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   title="Copy"
//                   className="p-1 lg:p-2.5"
//                   onClick={() => onCopy(path)}
//                 >
//                   <Copy className="size-3.5 lg:size-4" />
//                 </Button>
//               ) : (
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   title="Copied to clipboard"
//                   className="p-1 lg:p-2.5 cursor-default hover:bg-transparent"
//                 >
//                   <Check className="size-3.5 lg:size-4" />
//                 </Button>
//               )}
//             </div>
//             {!isUser && (
//               <span className="flex items-center gap-1.5 text-sm font-medium">
//                 <Info className="text-gray-500 size-[14px]" />
//                 {`Create an account to get API`}
//               </span>
//             )}
//           </div>

//           <div className="hidden lg:block">
//             {!isCopied ? (
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 title="Copy"
//                 className="p-1 lg:p-2.5"
//                 onClick={() => onCopy(path)}
//               >
//                 <Copy className="size-3.5 lg:size-4" />
//               </Button>
//             ) : (
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 title="Copied to clipboard"
//                 className="p-1 lg:p-2.5 cursor-default hover:bg-transparent"
//               >
//                 <Check className="size-3.5 lg:size-4" />
//               </Button>
//             )}
//           </div>
//         </div>
//         {info && (
//           <div className="mt-1 flex items-center gap-1.5">
//             <Info size={16} className="text-gray-500" />
//             <p className="text-sm font-semibold">{info}</p>
//           </div>
//         )}

//         {values && (
//           <div className="mt-2">
//             <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
//               values ={` { `}
//               <span className="space-x-2">
//                 {values.map((value, i) => (
//                   <span key={i} >
//                     {value.name}: {value.type} {value.optional && "(optional)"}
//                     {i < values.length - 1 && ","}
//                   </span>
//                 ))}
//                 {` } `}
//               </span>
//             </code>
//           </div>
//         )}
//       </AlertDescription>
//     </Alert>
//   );
// }
