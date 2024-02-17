import { useState } from "react";
import { Editor } from "@tiptap/react";
import { VideoIcon } from "./icons/video-icon";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

export default function YoutubeVideo({ editor }: { editor: Editor | null }) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [url, setUrl] = useState("");
  const [width, setWidth] = useState<string>(null!);
  const [height, setHeight] = useState<string>(null!);

  const addYoutubeVideo = () => {
    if (!url) return;

    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: Number(width) || 640,
        height: Number(height) || 480,
      });
    }

    setShowVideoModal(false);
    setUrl("");
  };

  return (
    <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={showVideoModal ? "is-active" : ""}
          onClick={() => setShowVideoModal(!showVideoModal)}
          title="Youtube video"
        >
          <span className="fill-gray-700">
            <VideoIcon />
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="px-[35px] py-[40px]">
        <form className="w-full">
          <label htmlFor="url" className="font-medium">
            Youtube video URL:
          </label>
          <input
            id="url"
            type="url"
            placeholder="Enter youtube video link"
            className="mt-2 p-3 w-full outline-none bg-card rounded-md border border-border focus:border-primary"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoComplete="off"
            required
          />
          <div className="mt-4 flex justify-between items-center gap-2">
            <label>
              <span className="text-sm">Width:</span>
              <input
                type="number"
                className="ml-2 mt-2 p-1 w-[80px] outline-none bg-card rounded-md border border-border focus:border-primary"
                name="width"
                value={width ?? 640}
                min="200"
                max="1000"
                onChange={(e) => setWidth(e.target.value)}
                required
              />
            </label>
            <label>
              <span className="text-sm">Height:</span>
              <input
                type="number"
                className="ml-2 mt-2 p-1 w-[80px] outline-none bg-card rounded-md border border-border focus:border-primary"
                name="height"
                value={height ?? 480}
                min="200"
                max="1000"
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="mt-7 flex justify-center">
            <Button
              type="button"
              className="w-[150px]"
              onClick={addYoutubeVideo}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
