import MenuButton from "./MenuButton";
import { Filter } from "react-feather";
import Labels from "./Labels";
export type SortType = "" | "dd" | "da" | "ta" | "td";
interface NoteFilterProps {
  onChange: (selectedLabels: string[]) => void;
  labels: string[];
  onSelectChange: (sortType: SortType) => void;
}
const NoteFilter = ({ labels, onChange, onSelectChange }: NoteFilterProps) => {
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
        <select
          onChange={(e) => {
            onSelectChange(e.target.value as SortType);
          }}
          id="sort"
          className="bg-transparent p-4 rounded-md outline outline-2 outline-zinc-800 w-min active:outline-indigo-500 focus:outline-indigo-500"
        >
          <option value="">--Choose an option--</option>
          <option value="da">Date: Ascending</option>
          <option value="dd">Date: Descending</option>
          <option value="ta">Title: Ascending</option>
          <option value="td">Title: Descending</option>
        </select>
      </div>
    </div>
  );
};

export default NoteFilter;
