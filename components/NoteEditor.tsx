"use client";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  ArrowLeft,
  Eye,
  Italic,
  Maximize2,
  Plus,
  Save,
  Star,
  X,
} from "react-feather";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { Editor as WYSIWYGEditor } from "react-draft-wysiwyg";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import EditorButton from "./EditorButton";
import useStore from "@store/index";
import { Input } from "./Input";
import clsx from "clsx";
import {
  EditorActionKind,
  NoteEditorState,
  initialState,
  noteEditorReducer,
} from "@util/editorReducer";
import { useLocalStorageValue } from "@react-hookz/web";
import useIsMobile from "@util/useIsMobile";

interface NoteEditorProps {
  refetch: () => void;
}

const NoteEditor = (props: NoteEditorProps) => {
  const refetch = props.refetch;
  const handle = useFullScreenHandle();

  const [
    editingNote,
    setEditingNote,
    notes,
    isViewing,
    setIsViewing,
    isEditing,
    setEditing,
  ] = useStore((s) => [
    s.editingNote,
    s.setEditingNote,
    s.notes,
    s.isViewing,
    s.setIsViewing,
    s.isEditing,
    s.setEditing,
  ]);
  const [localMode] = useStore((s) => [s.localMode]);
  const { value, set } = useLocalStorageValue<Note[]>("notes", {
    defaultValue: [],
    initializeWithValue: true,
  });
  const isMobile = useIsMobile();
  const editingNoteData = notes[editingNote || 0];
  const setMode = useStore((s) => s.setSelectedMode);
  const setSidebar = useStore((s) => s.setSidebarOpen);
  const supabase = useStore((s) => s.supabase);
  const session = useStore((s) => s.session);
  const [preview, setPreview] = useState(false);
  const [
    { title, editorState, favorite, type, labels, labelValue, focused },
    dispatch,
  ] = useReducer(noteEditorReducer, initialState);
  function resetEditor() {
    dispatch({ type: EditorActionKind.RESET });
    setEditingNote(null);
    setIsViewing(false);
    setEditing(false);
  }
  async function addNote() {
    let note: Note = {
      archived: false,
      content:
        type == "wysiwyg"
          ? JSON.stringify(
              convertToRaw(editorState.wysiwyg.getCurrentContent())
            )
          : editorState[type],
      editor: type,
      created: new Date().getTime(),
      favorite,
      labels,
      title,
      id: -1,
    };
    const data = {
      data: note,
      uid: session?.user.id,
    };
    if (localMode) {
      note.id = crypto.randomUUID() as unknown as number;
    }
    if (isEditing) {
      note.id = editingNoteData.id;
      note.created = editingNoteData.created;
      note.archived = editingNoteData.archived;
      if (localMode && value) {
        const idx = value.findIndex((el) => el.id === editingNoteData.id);
        let newVals = [...value];
        newVals[idx] = note;
        set(newVals);
      } else {
        await supabase.from("Notes").update(data).eq("id", note.id);
      }
    } else {
      if (localMode) {
        set([...(value || []), note]);
      } else {
        await supabase.from("Notes").upsert(data);
      }
    }
    refetch();
    setMode(1);
    resetEditor();
  }

  const editor = useRef<WYSIWYGEditor>(null);
  useEffect(() => {
    if (isViewing || isEditing) {
      let editorContent = editingNoteData.content;
      let mdcontent = "";
      if (editingNoteData.editor === "wysiwyg") {
        editorContent = EditorState.createWithContent(
          convertFromRaw(JSON.parse(editingNoteData.content))
        );
      } else {
        editorContent = EditorState.createEmpty();
        mdcontent = editingNoteData.content;
      }

      const savedState: NoteEditorState = {
        editorState: {
          markdown: mdcontent,
          wysiwyg: editorContent,
        },
        favorite: editingNoteData.favorite,
        focused: false,
        labels: editingNoteData.labels,
        title: editingNoteData.title,
        type: editingNoteData.editor,
        labelValue,
      };
      dispatch({ type: EditorActionKind.SET_STATE, payload: savedState });
    }
  }, [isViewing, isEditing]);
  const editorHeight = isMobile ? "20vh" : "35vh";
  return (
    <div className="flex-col h-screen gap-y-2 overflow-hidden flex py-16 md:py-8  w-full">
      <div>
        <button
          onClick={() => {
            setMode(1);
            resetEditor();
          }}
          className="flex items-center justify-center gap-x-2"
        >
          <ArrowLeft />
          <div>Back</div>
        </button>
      </div>
      <div>
        <div>Title</div>
        <Input
          disabled={isViewing}
          value={(isViewing && editingNoteData.title) || title}
          onChange={(e) =>
            dispatch({
              type: EditorActionKind.SET_TITLE,
              payload: e.currentTarget.value,
            })
          }
          placeholder="Title"
        />
      </div>

      <div>
        <div>Labels {!isViewing && <span>(up to 5) </span>} </div>
        <div
          className={`flex rounded-md p-2 my-2  gap-x-2 border border-zinc-600 ${clsx(
            {
              "border-indigo-500": focused,
            }
          )}`}
        >
          {((isViewing && editingNoteData.labels) || labels).map((el, i) => (
            <div
              key={i}
              className="rounded-md border-zinc-500 border whitespace-nowrap flex gap-x-2 items-center justify-center bg-zinc-900 p-2"
            >
              {el}
              {!isViewing && (
                <button
                  onClick={() => {
                    dispatch({
                      type: EditorActionKind.SET_LABELS,
                      payload: labels.filter((el, j) => i !== j),
                    });
                  }}
                >
                  <X />
                </button>
              )}
            </div>
          ))}
          {!isViewing && labels.length < 5 && (
            <Input
              disabled={isViewing}
              onFocus={(e) => {
                dispatch({ type: EditorActionKind.SET_FOCUSED, payload: true });
              }}
              onBlur={() => {
                dispatch({
                  type: EditorActionKind.SET_FOCUSED,
                  payload: false,
                });
              }}
              value={labelValue}
              placeholder="Enter labels"
              onChange={(e) =>
                dispatch({
                  type: EditorActionKind.SET_LABEL_VALUE,
                  payload: e.currentTarget.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && labelValue.length > 0) {
                  dispatch({
                    type: EditorActionKind.SET_LABEL_VALUE,
                    payload: "",
                  });
                  dispatch({
                    type: EditorActionKind.SET_LABELS,
                    payload: Array.from(new Set([...labels, labelValue])),
                  });
                }
              }}
              className="border-none outline-0 outline-none px-2"
            />
          )}
        </div>
      </div>
      <FullScreen handle={handle}>
        <div className="h-full flex flex-col">
          <div className="flex w-full items-end justify-end p-4 ">
            <button
              className="p-2 z-50"
              onClick={handle.active ? handle.exit : handle.enter}
            >
              <Maximize2 />
            </button>
          </div>
          {type === "markdown" && !preview && !isViewing && (
            <Editor
              onChange={(e) => {
                dispatch({ type: EditorActionKind.SET_MD, payload: e });
              }}
              theme="vs-dark"
              width={"100%"}
              height={handle.active ? "100vh" : editorHeight}
              value={editorState.markdown}
              defaultLanguage="markdown"
            />
          )}
          {type === "markdown" && (isViewing || preview) && (
            <div
              style={{
                height: isMobile ? "100vh" : editorHeight,
              }}
              className="w-full overflow-y-scroll test-class"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {(isViewing &&
                  editingNoteData.editor === "markdown" &&
                  editingNoteData.content) ||
                  editorState.markdown}
              </ReactMarkdown>
            </div>
          )}
          {type === "wysiwyg" && (
            <WYSIWYGEditor
              ref={editor}
              readOnly={preview || isViewing}
              wrapperStyle={{
                height: handle.active ? "80vh" : editorHeight,
                maxHeight: handle.active ? "80vh" : editorHeight,
              }}
              editorState={editorState.wysiwyg}
              editorClassName="w-full py-16"
              toolbarClassName={`text-black ${
                (preview || isViewing) && "opacity-0"
              }`}
              onEditorStateChange={(e) =>
                dispatch({ type: EditorActionKind.SET_WYSIWYG, payload: e })
              }
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center md:text-base text-xs  px-4">
          <div className="w-full flex gap-x-3 ">
            {!isViewing && (
              <EditorButton
                onClick={() => {
                  dispatch({
                    type: EditorActionKind.SET_FAVORITE,
                    payload: !favorite,
                  });
                }}
                active={favorite}
                icon={<Star />}
              >
                <div>Favorite</div>
              </EditorButton>
            )}
            {((isViewing && type === "wysiwyg") ||
              isEditing ||
              (!isEditing && !isViewing)) && (
              <EditorButton
                active={type === "wysiwyg"}
                icon={<Italic />}
                onClick={() => {
                  dispatch({
                    type: EditorActionKind.SET_TYPE,
                    payload: "wysiwyg",
                  });
                }}
              >
                <div>Editor Mode</div>
              </EditorButton>
            )}
            {((isViewing && type === "markdown") ||
              isEditing ||
              (!isEditing && !isViewing)) && (
              <EditorButton
                icon={""}
                active={type === "markdown"}
                onClick={() => {
                  dispatch({
                    type: EditorActionKind.SET_TYPE,
                    payload: "markdown",
                  });
                }}
              >
                <div className="italic"> MD </div>
                <div>Markdown Mode</div>
              </EditorButton>
            )}

            {!isViewing && (
              <EditorButton
                icon={<Eye />}
                active={preview}
                onClick={() => {
                  setPreview((prev) => !prev);
                }}
              >
                <div className="whitespace-nowrap text-center"> Preview </div>
              </EditorButton>
            )}
          </div>
          {!isViewing && (
            <EditorButton
              onClick={addNote}
              className="md:w-auto w-full my-2 flex flex-row"
              icon={""}
            >
              <div className="flex  gap-x-2 whitespace-nowrap text-center">
                <div>
                  {isEditing && <Save />}
                  {!isEditing && <Plus />}
                </div>{" "}
                {isEditing ? "Save note" : "Add note"}{" "}
              </div>
            </EditorButton>
          )}
        </div>
      </FullScreen>
    </div>
  );
};

export default NoteEditor;
