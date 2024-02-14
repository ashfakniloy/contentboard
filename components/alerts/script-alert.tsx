"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Copy, FileCode2, Info, Palette } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config";

// const scriptCode = `<link
// rel="stylesheet"
// href="${BASE_URL}/_next/static/css/f4b2ee2f39e6b871.css"
// />`;

export default function ScriptAlert({
  isUser,
  scriptUrl,
}: {
  isUser: boolean;
  scriptUrl: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const isCopiedTimeout = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    return () => clearTimeout(isCopiedTimeout);
  }, [isCopied]);

  const scriptCode = `<script src="${scriptUrl}" async />`;

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("Script code copied to clipboard", { duration: 3000 });
    setIsCopied(true);
  };

  return (
    <Alert>
      <FileCode2 className="h-4 w-4" />
      <AlertTitle className="">SCRIPT</AlertTitle>
      <AlertDescription className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {scriptCode}
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
              onClick={() => onCopy(scriptCode)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Copied to clipboard"
              className="hover:bg-transparent"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="mt-1 flex items-center gap-1.5">
          <Info size={16} className="text-gray-500" />
          <p className="text-sm font-semibold">
            Add this script tag to the root of your application. This will set a
            unique visitor ID in a cookie
          </p>
        </div>

        <div className="mt-1 flex items-center gap-1.5">
          <Info size={16} className="text-gray-500" />
          <p className="text-sm font-semibold">
            Make sure to pass headers in single blog GET request. Since you will
            be using SSR, you must manually include headers from your
            client-side request to the server-side GET request
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
