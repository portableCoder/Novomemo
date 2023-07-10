"use client";
import {
  Archive,
  Book,
  ChevronDown,
  Edit,
  Key,
  Plus,
  Star,
  Tag,
  X,
} from "react-feather";
import React, { useRef, useState } from "react";
import MenuButton from "./MenuButton";
import Labels from "./Labels";
import useStore from "@store/index";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "react-use";

const menus = [
  [<Plus />, "Add note"],
  [<Edit />, "All notes"],
  [<Star />, "Favorites"],
  [<Book />, "Scratchpad"],
  [<Archive />, "Archive"],
];

const Sidebar = () => {
  const [labelOpen, setLabelOpen] = useState(false);

  const { selectedMode, setSelectedMode } = useStore(
    ({ selectedMode, setSelectedMode }) => ({ selectedMode, setSelectedMode })
  );
  const labelSpring = useSpring({
    y: labelOpen ? 0 : -25,
    opacity: labelOpen ? 1 : 0,
  });
  const chevronSpring = useSpring({
    rotate: labelOpen ? 180 : 0,
  });
  const sidebarOpen = useStore((s) => s.sidebarOpen);

  const setSidebarOpen = useStore((s) => s.setSidebarOpen);
  const supabase = useStore((s) => s.supabase);
  return (
    <animated.div className="text-xl ">
      <div className="h-full fixed px-4  bg-zinc-900 flex flex-col gap-y-1.5 outline outline-1 outline-zinc-800">
        <div className="text-3xl px-4 my-2 flex  justify-between">
          <div>Novomemo</div>
          <button
            onClick={() => {
              setSidebarOpen((prev) => !prev);
            }}
            className="flex items-center"
          >
            <X />
          </button>
        </div>
        {menus.map(([icon, text], i) => {
          return (
            <MenuButton
              onClick={() => {
                setSelectedMode(i);
              }}
              icon={icon}
              active={i === selectedMode}
            >
              {text}
            </MenuButton>
          );
        })}
        <MenuButton
          onClick={() => {
            setLabelOpen((prev) => !prev);
          }}
          icon={<Tag />}
        >
          <div className="flex gap-x-2">
            Labels
            <div className="bg-white w-6 h-6 flex items-center justify-center text-black rounded-full text-base">
              {Labels.length}
            </div>
          </div>
          <animated.div style={chevronSpring}>
            <ChevronDown />
          </animated.div>
        </MenuButton>
        <MenuButton
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
          }}
          icon={<Key />}
        >
          Sign out
        </MenuButton>
        <animated.div
          style={labelSpring}
          className="grid grid-cols-3 gap-x-3 gap-y-2 px-4 overflow-hidden"
        >
          <Labels
            items={["Health", "Office", "Work", "Chores"]}
            selectedItems={() => {}}
          />
        </animated.div>
      </div>
    </animated.div>
  );
};

export default Sidebar;
