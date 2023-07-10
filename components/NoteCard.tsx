import dayjs from "@util/dayjs";
import React from "react";
import { Archive, Italic, Star } from "react-feather";
interface NoteCardProps {
  note: Note;
}
const NoteCard = ({ note }: NoteCardProps) => {
  const icons = [
    [<Star />, note.favorite],
    ["MD", note.editor === "markdown"],
    [<Italic />, note.editor === "wysiwyg"],
    [<Archive />, note.archived],
  ];

  return (
    <button className=" bg-zinc-800 duration-200 transition-all scale-100 hover:scale-150   outline-zinc-700 outline outline-2 text-white rounded-md w-full flex flex-col p-2">
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
        {icons.map(([icon, enabled]) => {
          if (enabled) {
            return icon;
          }
        })}
      </div>
    </button>
  );
};

export default NoteCard;
