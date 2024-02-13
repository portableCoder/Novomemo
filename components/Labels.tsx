import React, { useEffect, useState } from "react";
interface Labels {
  items: string[];
  selectedItems?: (items: string[]) => void;
  fixed?: boolean;
}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Labels = ({ items, selectedItems, fixed }: Labels) => {
  const [sel, setSel] = useState(items.map((el) => false));
  useEffect(() => {
    if (selectedItems) {
      selectedItems(items.filter((_, j) => sel[j]));
    }
  }, [sel]);
  return (
    <>
      {items.map((el, i) => (
        <button
          key={i}
          onClick={() => {
            if (!fixed) {
              const s = [...sel];
              s[i] = !s[i];
              setSel(s);
            }
          }}
          className={`py-2 px-8 rounded-md text-white  ${
            sel[i] ? "border-4  border-indigo-500" : " border-4 border-zinc-600"
          } `}
        >
          {el}
        </button>
      ))}
    </>
  );
};

export default Labels;
