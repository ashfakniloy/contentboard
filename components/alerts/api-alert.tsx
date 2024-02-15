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
      <AlertTitle className="">{title}</AlertTitle>
      <AlertDescription className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {path}
            </code>
            {!isUser && (
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <Info size={14} className="text-gray-500" />
                {`Create an account to get API`}
              </span>
            )}
          </div>

          {!isCopied ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Copy"
              onClick={() => onCopy(path)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Copied to clipboard"
              className="cursor-default hover:bg-transparent"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
        {info && (
          <div className="mt-1 flex items-center gap-1.5">
            <Info size={16} className="text-gray-500" />
            <p className="text-sm font-semibold">{info}</p>
          </div>
        )}

        {values && (
          <div className="mt-2">
            <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              values ={` { `}
              <span className="space-x-2">
                {values.map((value, i) => (
                  <span key={i} className="">
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
