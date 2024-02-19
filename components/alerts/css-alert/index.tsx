"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Info, Palette } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cssCode } from "./css-code";

export default function CssAlert({ cssUrl }: { cssUrl: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  useEffect(() => {
    const isCopiedTimeout = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    return () => clearTimeout(isCopiedTimeout);
  }, [isCopied]);

  useEffect(() => {
    const isCodeCopiedTimeout = setTimeout(() => {
      setIsCodeCopied(false);
    }, 3000);

    return () => clearTimeout(isCodeCopiedTimeout);
  }, [isCodeCopied]);

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("CSS link copied to clipboard", { duration: 3000 });
    setIsCopied(true);
  };

  const onCSSCopy = () => {
    navigator.clipboard.writeText(cssCode);
    toast.success("CSS code copied to clipboard", { duration: 3000 });
    setIsCodeCopied(true);
  };

  return (
    <Alert>
      <Palette className="h-4 w-4" />
      <AlertTitle>CSS</AlertTitle>
      <AlertDescription>
        <div className="flex items-center justify-between gap-2">
          <div className="w-full lg:w-auto p-1 lg:p-0 overflow-x-auto overflow-y-hidden">
            <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {cssUrl}
            </code>
          </div>

          {!isCopied ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Copy"
              onClick={() => onCopy(cssUrl)}
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

        <div className="flex items-center gap-2">
          <p className="font-medium text-xs lg:text-sm">
            Or customize as your own -
          </p>
          {!isCodeCopied ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Copy CSS code"
              className="text-xs h-7 flex items-center gap-1"
              onClick={onCSSCopy}
            >
              <Copy className="size-4" />
              <span>Copy CSS code</span>
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Copied to clipboard"
              className="text-xs h-7 flex items-center gap-1 cursor-default hover:bg-transparent"
            >
              <Check className="size-4" />
              <span>Copied to clipboard</span>
            </Button>
          )}
        </div>

        <div className="mt-1 flex lg:items-center gap-1.5">
          <div className="mt-[3px] lg:mt-0">
            <Info className="text-gray-500 size-[16px]" />
          </div>
          <p className="text-sm font-semibold">{`For rendering blog's body, use an HTML parser`}</p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
