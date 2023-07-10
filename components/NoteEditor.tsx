"use client";
import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";
import { ArrowLeft, Eye, Italic, Plus, Star, X } from "react-feather";
import ReactQuill from "react-quill";
import { EditorState, convertToRaw } from "draft-js";
import { Editor as WYSIWYGEditor } from "react-draft-wysiwyg";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import EditorButton from "./EditorButton";
import useStore from "@store/index";
import useLocalStore from "@util/useLocalStore";
import { Input } from "./Input";
import { useStorageValue } from "@react-hookz/web/cjs/useStorageValue";
import { useLocalStorageValue } from "@react-hookz/web";
import clsx from "clsx";

const NoteEditor = () => {
  const [preview, setPreview] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const setMode = useStore((s) => s.setSelectedMode);
  const [labels, setLabels] = useState<string[]>([]);

  const setSidebar = useStore((s) => s.setSidebarOpen);
  const [title, setTitle] = useState("");

  const supabase = useStore((s) => s.supabase);
  const [type, setType] = useState<Note["editor"]>("wysiwyg");
  const [editorState, setEditorState] = useState({
    markdown: "",
    wysiwyg: EditorState.createEmpty(),
  });
  const notes = useLocalStorageValue<Note[]>("note-store", {
    defaultValue: [],
    initializeWithValue: true,
  });
  const session = useStore((s) => s.session);
  async function addNote() {
    let old = notes.value || [];
    const id = crypto.randomUUID();
    const note: Note = {
      archived: false,
      content: editorState[type],
      editor: type,
      created: new Date().getTime(),
      favorite,
      labels,
      title,
      id: "",
    };
    const res = await supabase.from("Notes").upsert({
      data: note,
      uid: session?.user.id,
    });
    console.log(res);
    setMode(1);
    setTitle("");
    setEditorState({
      markdown: "",
      wysiwyg: EditorState.createEmpty(),
    });

    setType("wysiwyg");
    setFavorite(false);
    setSidebar(() => false);
  }
  const [focused, setFocused] = useState(false);
  const [labelValue, setLabelValue] = useState("");
  return (
    <div
      style={{
        height: "100%",
      }}
      className="flex-col gap-y-2 flex py-8  w-full"
    >
      <div>
        <button
          onClick={() => {
            setMode(1);
          }}
          className="flex items-center justify-center gap-x-2"
        >
          <ArrowLeft />
          <div>Back</div>
        </button>
      </div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="Title"
      />
      <div
        className={`flex rounded-md p-2 my-2  gap-x-2 border border-zinc-600 ${clsx(
          {
            "border-indigo-500": focused,
          }
        )}`}
      >
        {labels.map((el, i) => (
          <div className="rounded-md border-zinc-500 border whitespace-nowrap flex gap-x-2 items-center justify-center bg-zinc-900 py-1 p-2">
            {el}
            <button
              onClick={() => {
                setLabels(labels.filter((el, j) => i !== j));
              }}
            >
              <X />
            </button>
          </div>
        ))}
        <Input
          onFocus={(e) => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          value={labelValue}
          placeholder="Enter labels"
          onChange={(e) => setLabelValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setLabels((prev) => [...prev, labelValue]);
              setLabelValue("");
            }
          }}
          className="border-none outline-0 outline-none"
        />
      </div>
      {type === "markdown" && !preview && (
        <Editor
          onChange={(e) => {
            setEditorState({
              markdown: e || "",
              wysiwyg: editorState.wysiwyg,
            });
          }}
          theme="vs-dark"
          width={"100%"}
          height={"85%"}
          value={editorState.markdown}
          defaultLanguage="markdown"
        />
      )}
      {type === "markdown" && preview && (
        <div
          style={{
            height: "80%",
          }}
          className="w-full overflow-y-scroll"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {editorState.markdown}
          </ReactMarkdown>
        </div>
      )}
      {type === "wysiwyg" && (
        <WYSIWYGEditor
          readOnly={preview}
          wrapperStyle={{
            height: "70%",
            maxHeight: "70%",
          }}
          editorState={editorState.wysiwyg}
          editorClassName="w-full py-16"
          toolbarClassName={`text-black ${preview && "opacity-0"}`}
          onEditorStateChange={(e) =>
            setEditorState({
              markdown: editorState.markdown,
              wysiwyg: e,
            })
          }
        />
      )}
      <div className="flex flex-col md:flex-row md:justify-between items-center my-6  py-4">
        <div className="w-full flex gap-x-3 text-xs">
          <EditorButton
            onClick={() => setFavorite((prev) => !prev)}
            active={favorite}
            icon={<Star />}
          >
            <div>Favorite</div>
          </EditorButton>
          <EditorButton
            active={type === "wysiwyg"}
            icon={<Italic />}
            onClick={() => setType("wysiwyg")}
          >
            <div>Editor Mode</div>
          </EditorButton>
          <EditorButton
            icon={""}
            active={type === "markdown"}
            onClick={() => setType("markdown")}
          >
            <div className="italic"> MD </div>
            <div>Markdown Mode</div>
          </EditorButton>

          <EditorButton
            icon={<Eye />}
            active={preview}
            onClick={() => {
              setPreview((prev) => !prev);
            }}
          >
            <div className="whitespace-nowrap text-center"> Preview </div>
          </EditorButton>
        </div>
        <EditorButton
          onClick={addNote}
          className="md:w-auto w-full my-2 flex-row"
          icon={""}
        >
          <div className="whitespace-nowrap text-center"> + Add note </div>
        </EditorButton>
      </div>
    </div>
  );
};

export default NoteEditor;
