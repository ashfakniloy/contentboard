import { useState, useCallback, useEffect } from "react";
import { LinkIcon } from "./icons/link-icon";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { RadioField } from "../form-fields/radio-field";
import { Button } from "../ui/button";
import type { Editor } from "@tiptap/react";

export default function LinkButton({ editor }: { editor: Editor | null }) {
  const [showLinkModal, setShowLinkModal] = useState(false);

  const [url, setUrl] = useState(editor?.getAttributes("link").href || "");

  const [rel, setRel] = useState(
    editor?.getAttributes("link").rel || "doFollow"
  );
  const [target, setTarget] = useState(
    editor?.getAttributes("link").target || "_blank"
  ); // Or "_self" based on preference

  const handleButtonClick = () => {
    setShowLinkModal(!showLinkModal);
    setUrl(editor?.getAttributes("link").href);
  };

  const handleAddLink = () => {
    if (!url) return;

    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: target, rel: rel })
        .run();
    } else {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    }

    setShowLinkModal(false);
    setUrl("");
  };

  // console.log("state", editor?.getAttributes("link"));

  const handleRemoveLink = useCallback(() => {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowLinkModal(false);
  }, [editor, setShowLinkModal]);

  return (
    <Dialog open={showLinkModal} onOpenChange={setShowLinkModal}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={
            showLinkModal || editor?.isActive("link") ? "is-active" : ""
          }
          onClick={handleButtonClick}
          title="Link"
        >
          <span className="fill-gray-700">
            <LinkIcon />
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="px-[35px] py-[40px]">
        <form className="w-full">
          <label htmlFor="url" className="font-medium">
            URL:
          </label>
          <input
            id="url"
            type="url"
            placeholder="Enter URL"
            className="mt-2 p-3 w-full outline-none bg-card rounded-md border border-border focus:border-primary"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoComplete="off"
            required
          />

          <div className="mt-4 flex justify-between items-center">
            <div className="space-y-3">
              <RadioField
                label="Do Follow"
                name="relOptions"
                checked={rel === "doFollow"}
                onChange={() => setRel("doFollow")}
              />
              <RadioField
                label="No Follow"
                name="relOptions"
                checked={rel === "noFollow"}
                onChange={() => setRel("noFollow")}
              />
            </div>
            <div className="space-y-3">
              <RadioField
                label="Open in New Tab"
                name="targetOptions"
                checked={target === "_blank"}
                onChange={() => setTarget("_blank")}
              />
              <RadioField
                label="Open in Same Tab"
                name="targetOptions"
                checked={target === "_self"}
                onChange={() => setTarget("_self")}
              />
            </div>
          </div>
          <div className="mt-7 flex justify-center">
            {!editor?.getAttributes("link").href ||
            editor?.getAttributes("link").href !== url ||
            editor?.getAttributes("link").target !== target ||
            editor?.getAttributes("link").rel !== rel ? (
              <Button
                type="button"
                className="w-[150px]"
                onClick={handleAddLink}
              >
                Save
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-[150px]"
                onClick={handleRemoveLink}
              >
                Remove
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
