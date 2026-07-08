"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback, useState, useRef } from "react";
import { Indent, Outdent, Palette } from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function TiptapEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
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
          "prose prose-p:my-3 prose-headings:mt-6 prose-headings:mb-3 prose-ul:my-3 prose-ol:my-3 prose-blockquote:my-4 prose-blockquote:border-l-4 prose-blockquote:border-violet-300 prose-blockquote:pl-4 prose-blockquote:italic max-w-none min-h-[280px] p-4 bg-white rounded-lg border border-violet-200 focus:outline-none font-plus-jakarta text-base leading-relaxed",
      },
      handleKeyDown: (_view, event) => {
        // Tab to indent, Shift+Tab to outdent
        if (event.key === "Tab") {
          event.preventDefault();
          if (event.shiftKey) {
            handleOutdent();
          } else {
            handleIndent();
          }
          return true;
        }
        return false;
      },
    },
  });

  // Indent: increase marginLeft on the current block node
  const handleIndent = useCallback(() => {
    if (!editor) return;
    const { state } = editor;
    const { from } = state.selection;
    const resolvedPos = state.doc.resolve(from);
    // Find the block-level node
    const blockNode = resolvedPos.node(resolvedPos.depth);
    if (!blockNode) return;

    const currentMargin = parseInt(
      (blockNode.attrs as Record<string, string>)?.style?.match(/margin-left:\s*(\d+)px/)?.[1] || "0",
      10
    );
    const newMargin = currentMargin + 40;

    // Use updateAttributes on the node
    editor.chain().focus().updateAttributes(blockNode.type.name, {
      style: `margin-left: ${newMargin}px`,
    }).run();

    // If updateAttributes didn't work (some nodes don't support arbitrary attrs),
    // fall back to wrapping in a blockquote for indent
    if (!editor.isActive("blockquote") && currentMargin === 0) {
      // The style approach may not stick on all node types, so we also offer blockquote
    }
  }, [editor]);

  const handleOutdent = useCallback(() => {
    if (!editor) return;
    const { state } = editor;
    const { from } = state.selection;
    const resolvedPos = state.doc.resolve(from);
    const blockNode = resolvedPos.node(resolvedPos.depth);
    if (!blockNode) return;

    const currentMargin = parseInt(
      (blockNode.attrs as Record<string, string>)?.style?.match(/margin-left:\s*(\d+)px/)?.[1] || "0",
      10
    );
    const newMargin = Math.max(0, currentMargin - 40);

    if (newMargin === 0) {
      editor.chain().focus().updateAttributes(blockNode.type.name, {
        style: "",
      }).run();
    } else {
      editor.chain().focus().updateAttributes(blockNode.type.name, {
        style: `margin-left: ${newMargin}px`,
      }).run();
    }
  }, [editor]);

  // Keep external value in sync if parent sets it
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  // ✅ All hooks must be declared before any early returns (Rules of Hooks)
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const presetColors = [
    { name: "Black", value: "#000000" },
    { name: "Dark Gray", value: "#4B5563" },
    { name: "Red", value: "#DC2626" },
    { name: "Orange", value: "#EA580C" },
    { name: "Amber", value: "#D97706" },
    { name: "Green", value: "#16A34A" },
    { name: "Teal", value: "#0D9488" },
    { name: "Blue", value: "#2563EB" },
    { name: "Indigo", value: "#4F46E5" },
    { name: "Violet", value: "#7C3AED" },
    { name: "Pink", value: "#DB2777" },
    { name: "Rose", value: "#E11D48" },
  ];

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

  const currentColor = editor.getAttributes("textStyle").color || "#000000";

  const btnClass = (active: boolean) =>
    `px-2 py-1 rounded text-sm font-medium transition-colors ${
      active
        ? "bg-violet-600 text-white shadow-sm"
        : "bg-white text-violet-700 border border-violet-200 hover:bg-violet-50"
    }`;

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2 border border-violet-200 bg-violet-50/50 rounded-lg p-2">
        {/* Text formatting */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))} title="Bold (Ctrl+B)">
          <strong>B</strong>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))} title="Italic (Ctrl+I)">
          <em>I</em>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive("underline"))} title="Underline (Ctrl+U)">
          <span className="underline">U</span>
        </button>

        <div className="mx-1 h-6 w-px bg-violet-200" />

        {/* Text Color */}
        <div className="relative" ref={colorPickerRef}>
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={btnClass(showColorPicker)}
            title="Text Color"
          >
            <span className="flex items-center gap-1">
              <Palette className="w-4 h-4" />
              <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: currentColor }} />
            </span>
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-violet-200 rounded-xl shadow-xl p-3 w-52">
              <p className="text-xs font-semibold text-violet-700 mb-2 font-outfit">Text Color</p>
              <div className="grid grid-cols-6 gap-1.5 mb-3">
                {presetColors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    title={c.name}
                    onClick={() => {
                      editor.chain().focus().setColor(c.value).run();
                      setShowColorPicker(false);
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-125 ${
                      currentColor === c.value ? "border-violet-600 ring-2 ring-violet-300" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-violet-100">
                <label className="text-xs text-neutral-500">Custom:</label>
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => {
                    editor.chain().focus().setColor(e.target.value).run();
                  }}
                  className="w-7 h-7 rounded cursor-pointer border-0 p-0"
                />
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetColor().run();
                    setShowColorPicker(false);
                  }}
                  className="text-xs text-red-500 hover:text-red-700 ml-auto font-medium"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mx-1 h-6 w-px bg-violet-200" />

        {/* Headings */}
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))} title="Heading 2">
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive("heading", { level: 3 }))} title="Heading 3">
          H3
        </button>

        <div className="mx-1 h-6 w-px bg-violet-200" />

        {/* Lists */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))} title="Bullet List">
          • List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))} title="Numbered List">
          1. List
        </button>

        <div className="mx-1 h-6 w-px bg-violet-200" />

        {/* Blockquote & Indent */}
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive("blockquote"))} title="Blockquote (indent block)">
          ❝ Quote
        </button>
        <button type="button" onClick={() => { if (editor.can().sinkListItem("listItem")) { editor.chain().focus().sinkListItem("listItem").run(); } else { editor.chain().focus().toggleBlockquote().run(); } }} className={btnClass(false)} title="Indent (Tab)">
          <Indent className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => { if (editor.can().liftListItem("listItem")) { editor.chain().focus().liftListItem("listItem").run(); } else if (editor.isActive("blockquote")) { editor.chain().focus().toggleBlockquote().run(); } }} className={btnClass(false)} title="Outdent (Shift+Tab)">
          <Outdent className="w-4 h-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-violet-200" />

        {/* Links */}
        <button type="button" onClick={setLink} className={btnClass(editor.isActive("link"))} title="Add or edit link">
          🔗 Link
        </button>
        <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} className="px-2 py-1 rounded text-sm bg-white text-violet-700 border border-violet-200 hover:bg-red-50 hover:text-red-600 transition-colors" title="Remove link">
          ✕ Link
        </button>

        <div className="mx-1 h-6 w-px bg-violet-200" />

        {/* Horizontal rule */}
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)} title="Horizontal divider">
          ― Line
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Tips */}
      <div className="text-xs text-neutral-500 mt-2 space-y-0.5 font-plus-jakarta">
        <p>💡 Press <kbd className="px-1 py-0.5 bg-violet-100 rounded text-violet-700">Enter</kbd> for a new paragraph. Use <kbd className="px-1 py-0.5 bg-violet-100 rounded text-violet-700">Shift + Enter</kbd> for a line break within the same paragraph.</p>
        <p>💡 Press <kbd className="px-1 py-0.5 bg-violet-100 rounded text-violet-700">Tab</kbd> to indent or <kbd className="px-1 py-0.5 bg-violet-100 rounded text-violet-700">Shift + Tab</kbd> to outdent list items.</p>
      </div>
    </div>
  );
}
