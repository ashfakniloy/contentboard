"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Info, Palette } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const cssText = `.ContentBoard > * + * {
  padding-top: 16px;
}

.ContentBoard h1,
.ContentBoard h2,
.ContentBoard h3,
.ContentBoard h4,
.ContentBoard h5,
.ContentBoard h6 {
  line-height: 1.1;
}

.ContentBoard > h1 {
  font-size: 32px;
  font-weight: bold;
}

.ContentBoard > h2 {
  font-size: 24px;
  font-weight: bold;
}

.ContentBoard > h3 {
  font-size: 20.8px;
  font-weight: bold;
}

.ContentBoard > h4 {
  font-size: 16px;
  font-weight: bold;
}

.ContentBoard > h5 {
  font-size: 12.8px;
  font-weight: bold;
}

.ContentBoard > h6 {
  font-size: 11.2px;
  font-weight: bold;
}

.ContentBoard > p {
  font-size: 16px;
}

.ContentBoard > ul {
  margin-left: 20px;
  list-style-type: disc;
}

.ContentBoard > ol {
  margin-left: 20px;
  list-style-type: decimal;
}

.ContentBoard ul,
.ContentBoard ol {
  padding: 16px 0px;
}

.ContentBoard code {
  background-color: transparent;
}

.ContentBoard pre {
  background-color: #0d0d0d;
  color: white;
  font-family: "JetBrainsMono", monospace;
  padding: 12px 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.ContentBoard pre code {
  font-size: 14px;
  color: inherit;
  background-color: #ffcc00;
}

.ContentBoard img {
  height: auto !important;
  cursor: default !important;
  max-width: 100%;
  display: inline;
}

.ContentBoard a {
  color: #0074d9;
  text-decoration: underline;
  transition: color 200ms;
}

.ContentBoard blockquote {
  padding-left: 16px;
  border-left: 2px solid #9c9c9c;
}

.ContentBoard hr {
  margin: 32px 0px;
  border-top: 1px solid #ccc;
}`;

export default function CssAlert({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
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
    navigator.clipboard.writeText(cssText);
    toast.success("CSS code copied to clipboard", { duration: 3000 });
    setIsCodeCopied(true);
  };

  return (
    <Alert>
      <Palette className="h-4 w-4" />
      <AlertTitle className="">{title}</AlertTitle>
      <AlertDescription className="">
        <div className="flex items-center justify-between">
          <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {path}
          </code>

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
              className="hover:bg-transparent"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <p className="font-medium">Or - </p>
          {!isCodeCopied ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              title="Copy CSS code"
              className="text-xs h-7 flex items-center gap-1"
              onClick={onCSSCopy}
            >
              <Copy className="h-4 w-4" />
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
              <Check className="h-4 w-4" />
              <span>Copied to clipboard</span>
            </Button>
          )}
        </div>

        <div className="mt-1 flex items-center gap-1">
          <Info size={16} className="text-gray-500" />
          <p className="text-sm font-semibold">
            {`Blog's body root className: `}
            <code className="rounded bg-muted dark:bg-[#18181B] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              ContentBoard
            </code>
          </p>
        </div>

        <div className="mt-1 flex items-center gap-1">
          <Info size={16} className="text-gray-500" />
          <p className="text-sm font-semibold">{`For rendering blog's body, use an HTML parser`}</p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
