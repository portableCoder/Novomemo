import React from "react";
import MenuButton from "./MenuButton";
import { Filter } from "react-feather";
import Labels from "./Labels";
interface NoteFilterProps {
  onChange: (selectedLabels: string[]) => void;
  labels: string[];
}
const NoteFilter = ({ labels, onChange }: NoteFilterProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <div>
        <div className="flex gap-x-3">
          <Filter />
          Filters
        </div>
      </div>
      <div>
        <div className="w-full flex flex-col gap-y-2">
          <div> Filter by labels </div>
          <div className="flex gap-3 flex-wrap">
            <Labels items={labels} selectedItems={onChange} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="sort">Sort by: </label>
        <select
          onChange={(e) => {
            console.log(e.target.value);
          }}
          name="data-sort"
          id="sort"
          className="bg-transparent p-4 rounded-md outline outline-2 outline-zinc-800 w-min active:outline-indigo-500 focus:outline-indigo-500"
        >
          <option className="" value="DA">
            {" "}
            Date: Ascending{" "}
          </option>
          <option value="DD">Date: Descending</option>
          <option value="TA">Title: Ascending</option>
          <option value="TD">Title: Descending</option>
        </select>
      </div>
    </div>
  );
};

export default NoteFilter;
