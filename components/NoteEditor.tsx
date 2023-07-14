"use client";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { ArrowLeft, Eye, Italic, Plus, Star, X } from "react-feather";
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

const NoteEditor = () => {
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
    setSidebar(() => false);
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
    if (isEditing) {
      note.id = editingNoteData.id;
      note.created = editingNoteData.created;
      console.log("editing -- >", note.id, editingNoteData.id);
      await supabase.from("Notes").update(data).eq("id", note.id);
    } else {
      await supabase.from("Notes").upsert(data);
    }
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
        favorite: false,
        focused: false,
        labels: editingNoteData.labels,
        title: editingNoteData.title,
        type: editingNoteData.editor,
        labelValue,
      };
      dispatch({ type: EditorActionKind.SET_STATE, payload: savedState });
    }
  }, [isViewing, isEditing]);

  return (
    <div
      style={{
        height: "100%",
      }}
      className="flex-col gap-y-2 flex py-16 md:py-8 h-screen overflow-y-hidden  w-full"
    >
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
        <div>Labels (up to 5) </div>
        <div
          className={`flex rounded-md p-2 my-2  gap-x-2 border border-zinc-600 ${clsx(
            {
              "border-indigo-500": focused,
            }
          )}`}
        >
          {((isViewing && editingNoteData.labels) || labels).map((el, i) => (
            <div className="rounded-md border-zinc-500 border whitespace-nowrap flex gap-x-2 items-center justify-center bg-zinc-900 p-2">
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
      {type === "markdown" && !preview && !isViewing && (
        <Editor
          onChange={(e) => {
            dispatch({ type: EditorActionKind.SET_MD, payload: e });
          }}
          theme="vs-dark"
          width={"100%"}
          height={"85%"}
          value={editorState.markdown}
          defaultLanguage="markdown"
        />
      )}
      {type === "markdown" && (isViewing || preview) && (
        <div
          style={{
            height: "80%",
          }}
          className="w-full overflow-y-scroll test-class"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
            height: "50%",
            maxHeight: "50%",
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
      <div className="flex flex-col md:flex-row md:justify-between items-center my-6  py-4">
        <div className="w-full flex gap-x-3 text-xs">
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
          {
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
          }
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
            className="md:w-auto w-full my-2 flex-row"
            icon={""}
          >
            <div className="whitespace-nowrap text-center">
              {" "}
              {isEditing ? "Save note" : "+ Add note"}{" "}
            </div>
          </EditorButton>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
