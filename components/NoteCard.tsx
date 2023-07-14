import useStore from "@store/index";
import dayjs from "@util/dayjs";
import React from "react";
import { Archive, Edit, Eye, Italic, Star, Type } from "react-feather";
interface NoteCardProps {
  note: Note;
}
const NoteCard = ({ note }: NoteCardProps) => {
  const icons = [
    [<Star />, note.favorite, ""],
    ["MD", note.editor === "markdown", "Markdown"],
    [<Type />, note.editor === "wysiwyg", "Editor"],
    [<Archive />, note.archived, "Archived"],
  ];
  const [notes, setEditing, setMode, setViewing, isEditing, setIsEditing] =
    useStore((s) => [
      s.notes,
      s.setEditingNote,
      s.setSelectedMode,
      s.setIsViewing,
      s.isEditing,
      s.setEditing,
    ]);
  return (
    <div className=" bg-zinc-800 justify-between   outline-zinc-700 outline outline-2 text-white rounded-md w-full flex  p-2">
      <div>
        <div className="text-3xl font-semibold ">{note.title}</div>
        <div className="flex gap-x-3">
          <div className="text-zinc-400">
            {new Date(note.created).toLocaleDateString()}
          </div>
          <div className="text-zinc-500">
            {`• ${dayjs().to(new Date(note.created))}`}
          </div>
        </div>
        <div className="flex gap-x-3">
          {icons.map(([icon, enabled, text]) => {
            if (enabled) {
              return (
                <div className="flex flex-col items-center justify-center text-sm">
                  <div>{icon}</div>
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
            setMode(0);
          }}
        >
          <Eye />
        </button>
        <button
          onClick={() => {
            setEditing(notes.findIndex((el) => el.id === note.id));
            setIsEditing(true);
            setMode(0);
          }}
        >
          <Edit />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
