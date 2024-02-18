import type { Editor } from "@tiptap/react";
import { AlignLeft } from "./icons/align-left";
import { AlignCenter } from "./icons/align-center";
import { AlignRight } from "./icons/align-right";
import { BulletList } from "./icons/bullet-list";
import { NumberList } from "./icons/number-list";
import { Quote } from "./icons/quote";
import { Undo } from "./icons/undo";
import { Redo } from "./icons/redo";
import { HorizontalRule } from "./icons/horizontal-rule";
import { ClearFormatting } from "./icons/clear-formatting";
import { Reset } from "./icons/reset";
import { PageBreak } from "./icons/page-break";
import LinkButton from "./link-button";
import ImageUpload from "./image-upload";
import TextSelect from "./text-select";
import YoutubeVideo from "./youtube-video";

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div
      className={`tiptap-toolbar border  ${
        editor.isFocused ? "border-primary" : " border-border"
      }`}
    >
      <TextSelect editor={editor} />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="Bold"
      >
        <b className="dark:text-gray-200">B</b>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="Italic"
      >
        <i className="font-serif dark:text-gray-200">I</i>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
        title="Underline"
      >
        <span className="underline underline-offset-2 dark:text-gray-200">
          U
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        title="Align left"
      >
        <span className="fill-gray-700">
          <AlignLeft />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        title="Align center"
      >
        <span className="fill-gray-700">
          <AlignCenter />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        title="Align right"
      >
        <span className="fill-gray-700">
          <AlignRight />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        title="Clear formatting"
      >
        <span className="fill-gray-700">
          <ClearFormatting />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title="Bullet list"
      >
        <span className="fill-gray-700">
          <BulletList />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title="Ordered list"
      >
        <span className="fill-gray-700">
          <NumberList />
        </span>
      </button>

      <ImageUpload editor={editor} />

      <YoutubeVideo editor={editor} />

      <LinkButton key={editor?.getAttributes("link").href} editor={editor} />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
        title="Blockquote"
      >
        <span className="fill-gray-700">
          <Quote />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal rule"
      >
        <span className="fill-gray-700">
          <HorizontalRule />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        title="Page break"
      >
        <span className="fill-gray-700">
          <PageBreak />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        title="Undo"
      >
        <span className="fill-gray-700">
          <Undo />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        title="Redo"
      >
        <span className="fill-gray-700">
          <Redo />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().clearContent(true).run()}
        disabled={!editor.can().chain().focus().clearContent().run()}
        title="Reset"
      >
        <span className="fill-gray-700">
          <Reset />
        </span>
      </button>
    </div>
  );
}
