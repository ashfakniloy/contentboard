import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import ImageResize from "tiptap-extension-resize-image";
import Toolbar from "./toolbar";
import "./styles.css";

export default function TextEditor({
  value,
  setValue,
}: {
  value: string;
  setValue: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      //  Link.configure({
      //   openOnClick: false,
      // }),
      // Link.extend({
      //   exitable: true,
      // }).configure({
      //   openOnClick: false,
      // }),
      Link.extend({
        inclusive: false,
      }).configure({
        openOnClick: false,
      }),

      TextStyle.configure({ types: [ListItem.name] } as any),

      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),

      Underline,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Image.configure({
        allowBase64: true,
        inline: true,
      }),

      ImageResize.configure({
        allowBase64: true,
        inline: true,
      }),

      Youtube,
    ],

    content: ``,

    onUpdate: ({ editor }) => {
      // const html = editor.getHTML();
      // setValue(html);

      const html = editor.getHTML();
      const wrappedHtml = `<div className="ContentBoard">${html}</div>`;
      setValue(wrappedHtml);
    },
  });

  useEffect(() => {
    // this is just an example. do whatever you want to do here
    // to retrieve your editors content from somewhere

    editor?.commands.setContent(value);
  }, [editor?.contentComponent]);

  return (
    <div>
      <Toolbar editor={editor} />

      <EditorContent editor={editor} required={true} />
    </div>
  );
}
