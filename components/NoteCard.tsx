import useStore from "@store/index";
import dayjs from "@util/dayjs";
import React from "react";
import {
  Archive,
  Edit,
  Eye,
  Icon,
  Italic,
  Star,
  Trash,
  Type,
} from "react-feather";
import Labels from "./Labels";
import { Menu } from "@util/Menu";
import { useLocalStorageValue } from "@react-hookz/web";
import useLocalNotes from "@util/useLocalNotes";
interface NoteCardProps {
  note: Note;
}
const NoteCard = ({ note }: NoteCardProps) => {
  const icons = [
    [Star, note.favorite, "Favorite"],
    ["MD", note.editor === "markdown", "Markdown"],
    [Type, note.editor === "wysiwyg", "Editor"],
    [Archive, note.archived, "Archived"],
  ] as [Icon | string, boolean, string][];
  const [
    notes,
    setEditing,
    setMode,
    setViewing,
    isEditing,
    setIsEditing,
    supabase,
    localMode,
    setNotes,
  ] = useStore((s) => [
    s.notes,
    s.setEditingNote,
    s.setSelectedMode,
    s.setIsViewing,
    s.isEditing,
    s.setEditing,
    s.supabase,
    s.localMode,
    s.setNotes,
  ]);

  const { localNotes, setLocalNotes } = useLocalNotes();
  return (
    <div className=" bg-zinc-800 justify-between   outline-zinc-700 outline outline-2 text-white rounded-md w-full flex  p-2">
      <div className="flex flex-col gap-y-3">
        <div className="text-3xl font-semibold ">{note.title}</div>
        <div className="flex gap-x-3 flex-wrap gap-y-3">
          {<Labels fixed={true} items={note.labels} />}
        </div>
        <div className="flex gap-x-3 text-sm">
          <div className="text-zinc-400">
            Created {new Date(note.created).toLocaleDateString()}
          </div>
          <div className="text-zinc-500">
            {`• ${dayjs().to(new Date(note.created))}`}
          </div>
        </div>
        <div className="flex w-full h-full items-end justify-start gap-x-3">
          {icons.map(([ItemIcon, enabled, text], i) => {
            if (enabled) {
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center text-sm"
                >
                  <div>
                    {typeof ItemIcon == "string" ? ItemIcon : <ItemIcon />}
                  </div>
                  {text}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <button
          onClick={() => {
            setEditing(notes.findIndex((el) => el.id === note.id));
            setViewing(true);
            setMode(Menu.ADD_NOTE);
          }}
        >
          <Eye />
        </button>
        <button
          onClick={() => {
            setEditing(notes.findIndex((el) => el.id === note.id));
            setIsEditing(true);
            setMode(Menu.ADD_NOTE);
          }}
        >
          <Edit />
        </button>
        <button
          onClick={async () => {
            const newNotes = notes.filter((el) => el.id !== note.id);
            if (localMode) {
              setLocalNotes(newNotes);
              setNotes(newNotes);
            } else {
              await supabase.from("Notes").delete().eq("id", note.id);
              setNotes(newNotes);
            }
          }}
        >
          <Trash />
        </button>
        {!note.archived && (
          <button
            onClick={async () => {
              let newNote = { ...note };
              const newNotes = [...notes];
              newNote.archived = true;
              const idx = newNotes.findIndex((el) => el.id === newNote.id);
              newNotes[idx] = newNote;
              if (localMode) {
                setLocalNotes(newNotes);
                setNotes(notes);
              } else {
                await supabase
                  .from("Notes")
                  .update({ content: newNote })
                  .eq("id", note.id);
                setNotes(newNotes);
              }
            }}
          >
            <Archive />
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
