import React, { useState } from "react";
interface Labels {
  items: string[];
  selectedItems: (items: string[]) => void;
}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
  const colors = [
    "bg-green-500",
    "bg-blue-500",
    "bg-orange-400",
    "bg-red-400",
    "bg-pink-500",
  ];
  return colors[getRandomInt(0, colors.length - 1)];
}
const Labels = ({ items, selectedItems }: Labels) => {
  const [sel, setSel] = useState(items.map((el) => false));
  return (
    <>
      {items.map((el, i) => (
        <button
          onClick={() => {
            const s = [...sel];
            s[i] = !s[i];

            setSel(s);
          }}
          className={`py-2 px-8 rounded-3xl text-white  ${
            sel[i] ? "border-4  border-white" : " border-4 border-transparent"
          } ${getRandomColor()}`}
        >
          {el}
        </button>
      ))}
    </>
  );
};

export default Labels;
