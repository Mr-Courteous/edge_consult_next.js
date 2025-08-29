"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function TiptapEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || "Start writing…",
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
    ],
    content: value || "<p></p>",
    editable: true,
    immediatelyRender: false, // ✅ avoids hydration mismatch
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[220px] p-3 bg-white rounded border border-violet-200 focus:outline-none",
      },
    },
  });

  // Keep external value in sync if parent sets it
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="border border-violet-200 rounded p-3 text-sm text-violet-500 bg-white">
        Loading editor…
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) return; // cancel

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Apply or update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-2 border border-violet-200 bg-violet-50/50 rounded p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive("bold")
              ? "bg-violet-600 text-white"
              : "bg-white text-violet-700 border border-violet-200"
          }`}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive("italic")
              ? "bg-violet-600 text-white"
              : "bg-white text-violet-700 border border-violet-200"
          }`}
        >
          Italic
        </button>

        <button
          type="button"
          onClick={setLink}
          className="px-2 py-1 rounded text-sm bg-white text-violet-700 border border-violet-200"
        >
          Add/Update Link
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-2 py-1 rounded text-sm bg-white text-violet-700 border border-violet-200"
        >
          Remove Link
        </button>

        <div className="mx-2 h-6 w-px bg-violet-200" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive("bulletList")
              ? "bg-violet-600 text-white"
              : "bg-white text-violet-700 border border-violet-200"
          }`}
        >
          • List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive("orderedList")
              ? "bg-violet-600 text-white"
              : "bg-white text-violet-700 border border-violet-200"
          }`}
        >
          1. List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${
            editor.isActive("heading", { level: 2 })
              ? "bg-violet-600 text-white"
              : "bg-white text-violet-700 border border-violet-200"
          }`}
        >
          H2
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Small tip */}
      <p className="text-xs text-violet-700/70 mt-2">
        Tip: Highlight text, click <em>Add/Update Link</em>, and paste a URL (e.g., WhatsApp).
      </p>
    </div>
  );
}
