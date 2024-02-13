"use client";
import { v4 } from "uuid";

import { Editor } from "@monaco-editor/react";
import React, { useEffect, useReducer, useState } from "react";
import { Edit, Eye, Plus, Save, Star, X } from "react-feather";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import EditorButton from "./EditorButton";
import useStore from "@store/index";
import { Input } from "./Input";
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
  const supabase = useStore((s) => s.supabase);
  const session = useStore((s) => s.session);
  const [preview, setPreview] = useState(false);
  const [
    { title, favorite, labels, labelValue, focused, data: notedata },
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
      content: notedata,
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
      note.id = v4() as unknown as number;
    }
    if (isEditing && editingNoteData) {
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

  useEffect(() => {
    if (isViewing || isEditing) {
      if (editingNoteData) {
        const savedState: NoteEditorState = {
          data: editingNoteData.content,
          favorite: editingNoteData.favorite,
          focused: false,
          labels: editingNoteData.labels,
          title: editingNoteData.title,
          labelValue,
        };

        dispatch({ type: EditorActionKind.SET_STATE, payload: savedState });
      } else {
        const savedState: NoteEditorState = {
          data: notedata,
          favorite,
          focused: false,
          labels,
          title,
          labelValue,
        };

        dispatch({ type: EditorActionKind.SET_STATE, payload: savedState });
      }
    }
  }, [isViewing, isEditing]);
  return (
    <div className="flex-col min-h-screen gap-y-2 overflow-hidden flex py-16 md:py-8 px-2  w-full">
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
        <div className="flex gap-x-2 flex-wrap">
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
        </div>
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
              const labelStripped = labelValue.trim();

              if (e.key === "Enter" && labelStripped.length > 0) {
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
      <div className="h-full  flex flex-col">
        {!preview && !isViewing && (
          <Editor
            onChange={(e) => {
              dispatch({ type: EditorActionKind.SET_MD, payload: e });
            }}
            className="outline outline-1 outline-zinc-700 rounded-md focus:outline-indigo-600 "
            theme="vs-dark"
            width={"100%"}
            height={isMobile ? "40vh" : "50vh"}
            value={notedata}
            defaultLanguage="markdown"
          />
        )}
        {(isViewing || preview) && (
          <div
            id="check-test"
            className="w-full h-full overflow-y-scroll test-class"
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
              {notedata}
            </ReactMarkdown>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-center md:text-base text-xs px-2 md:px-4">
        <div className="w-full flex gap-x-3 ">
          {
            <EditorButton
              onClick={() => {
                setEditing(true);
                setIsViewing(false);
                setPreview(false);
              }}
              buttonActive={isEditing}
              icon={<Edit />}
            >
              <div>Edit</div>
            </EditorButton>
          }
          {!isViewing && (
            <EditorButton
              onClick={() => {
                dispatch({
                  type: EditorActionKind.SET_FAVORITE,
                  payload: !favorite,
                });
              }}
              buttonActive={favorite}
              icon={<Star />}
            >
              <div>Favorite</div>
            </EditorButton>
          )}

          {!isViewing && (
            <EditorButton
              icon={<Eye />}
              buttonActive={preview}
              onClick={() => {
                setPreview((prev) => !prev);
              }}
            >
              <div className="whitespace-nowrap text-center"> Preview </div>
            </EditorButton>
          )}
        </div>
        {
          <EditorButton
            icon={""}
            className="md:w-auto w-full my-2 outline outline-1 outline-zinc-800 flex flex-row"
            onClick={() => {
              setMode(1);
              resetEditor();
            }}
          >
            <div className="flex  gap-x-2 items-center whitespace-nowrap text-center">
              <div>
                <X />
              </div>{" "}
              Close
            </div>
          </EditorButton>
        }
        {!isViewing && (
          <EditorButton
            onClick={addNote}
            className="md:w-auto w-full my-2 flex flex-row outline outline-1 outline-zinc-800 items-center"
            icon={""}
          >
            <div className="flex  gap-x-2 items-center whitespace-nowrap text-center">
              <div>
                {isEditing && <Save />}
                {!isEditing && <Plus />}
              </div>{" "}
              {isEditing ? "Save note" : "Add note"}{" "}
            </div>
          </EditorButton>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
