"use client";

import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback, useState, useRef } from "react";
import { Indent as IndentIcon, Outdent as OutdentIcon, Palette } from "lucide-react";

// --- Type support for Custom Commands ---
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indentation: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

// --- Custom Indent Extension ---
// This extension adds proper 'style="margin-left: Xpx"' rendering and parsing support to block nodes.
const Indent = Extension.create({
  name: "indentation",

  addOptions() {
    return {
      types: ["paragraph", "heading", "blockquote", "bulletList", "orderedList"],
      minLevel: 0,
      maxLevel: 10,
      indentRange: 40,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const style = element.getAttribute("style") || "";
              const match = style.match(/margin-left:\s*(\d+)px/);
              if (match) {
                const margin = parseInt(match[1], 10);
                return Math.min(
                  Math.max(Math.floor(margin / this.options.indentRange), this.options.minLevel),
                  this.options.maxLevel
                );
              }
              return 0;
            },
            renderHTML: (attributes) => {
              if (!attributes.indent || attributes.indent === 0) {
                return {};
              }
              return {
                style: `margin-left: ${attributes.indent * this.options.indentRange}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ tr, dispatch }) => {
          const { selection } = tr;
          let hasChanged = false;
          tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              const currentIndent = node.attrs.indent || 0;
              const nextIndent = Math.min(currentIndent + 1, this.options.maxLevel);
              if (nextIndent !== currentIndent) {
                hasChanged = true;
                if (dispatch) {
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    indent: nextIndent,
                  });
                }
              }
            }
          });
          return hasChanged;
        },
      outdent:
        () =>
        ({ tr, dispatch }) => {
          const { selection } = tr;
          let hasChanged = false;
          tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              const currentIndent = node.attrs.indent || 0;
              const nextIndent = Math.max(currentIndent - 1, this.options.minLevel);
              if (nextIndent !== currentIndent) {
                hasChanged = true;
                if (dispatch) {
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    indent: nextIndent,
                  });
                }
              }
            }
          });
          return hasChanged;
        },
    };
  },
});

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
      Indent,
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
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[280px] p-4 bg-white rounded-lg border border-neutral-200 focus:border-black focus:outline-none font-sans text-base leading-relaxed text-black prose-p:my-3 prose-headings:mt-6 prose-headings:mb-3 prose-ul:my-3 prose-ol:my-3 prose-blockquote:my-4 prose-blockquote:border-l-4 prose-blockquote:border-neutral-300 prose-blockquote:pl-4 prose-blockquote:italic",
      },
      handleKeyDown: (view, event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          if (event.shiftKey) {
            editor?.commands.outdent();
          } else {
            editor?.commands.indent();
          }
          return true;
        }
        return false;
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
      <div className="border border-neutral-200 rounded p-3 text-sm text-neutral-400 bg-white">
        Loading editor…
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const currentColor = editor.getAttributes("textStyle").color || "#000000";

  const btnClass = (active: boolean) =>
    `px-2.5 py-1 rounded text-sm font-medium transition-colors ${
      active
        ? "bg-black text-white shadow-sm"
        : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
    }`;

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2 border border-neutral-200 bg-neutral-50 rounded-lg p-2">
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

        <div className="mx-1 h-6 w-px bg-neutral-200" />

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
            <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-neutral-200 rounded-xl shadow-xl p-3 w-52">
              <p className="text-xs font-semibold text-neutral-700 mb-2">Text Color</p>
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
                      currentColor === c.value ? "border-black ring-2 ring-neutral-200" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
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

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        {/* Headings */}
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))} title="Heading 2">
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive("heading", { level: 3 }))} title="Heading 3">
          H3
        </button>

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        {/* Lists */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))} title="Bullet List">
          • List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))} title="Numbered List">
          1. List
        </button>

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        {/* Blockquote & Indentation */}
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive("blockquote"))} title="Blockquote">
          ❝ Quote
        </button>
        <button type="button" onClick={() => editor.chain().indent().run()} className={btnClass(false)} title="Indent (Tab)">
          <IndentIcon className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().outdent().run()} className={btnClass(false)} title="Outdent (Shift+Tab)">
          <OutdentIcon className="w-4 h-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        {/* Links */}
        <button type="button" onClick={setLink} className={btnClass(editor.isActive("link"))} title="Add or edit link">
          🔗 Link
        </button>
        <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} className="px-2 py-1 rounded text-sm bg-white text-neutral-700 border border-neutral-200 hover:bg-red-50 hover:text-red-600 transition-colors" title="Remove link">
          ✕ Link
        </button>

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        {/* Horizontal rule */}
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)} title="Horizontal divider">
          ― Line
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Tips */}
      <div className="text-xs text-neutral-400 mt-2 space-y-0.5 font-sans">
        <p>💡 Press <kbd className="px-1 py-0.5 bg-neutral-100 rounded text-neutral-800">Enter</kbd> for a new paragraph. Use <kbd className="px-1 py-0.5 bg-neutral-100 rounded text-neutral-800">Shift + Enter</kbd> for a line break.</p>
        <p>💡 Press <kbd className="px-1 py-0.5 bg-neutral-100 rounded text-neutral-800">Tab</kbd> to indent paragraphs/lists or <kbd className="px-1 py-0.5 bg-neutral-100 rounded text-neutral-800">Shift + Tab</kbd> to outdent.</p>
      </div>
    </div>
  );
}
