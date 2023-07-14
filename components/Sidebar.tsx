"use client";
import {
  Archive,
  ArrowLeft,
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
  const setLoading = useStore((s) => s.setGlobalLoading);
  const notes = useStore((s) => s.notes);
  return (
    <div className="h-full py-2 w-16 fixed top-0 left-0 justify-between items-center px-4  bg-zinc-900 flex flex-col gap-y-1.5 outline outline-1 outline-zinc-800">
      <div className="text-3xl px-4 my-2 flex  justify-between">
        <button
          onClick={() => {
            setSidebarOpen((prev) => !prev);
          }}
          className="flex items-center"
        >
          <ArrowLeft />
        </button>
      </div>
      {menus.map(([icon, text], i) => {
        return (
          <div className="flex flex-col items-center justify-center p-2 text-xs">
            <MenuButton
              onClick={() => {
                setSelectedMode(i);
              }}
              icon={icon}
              active={i === selectedMode}
            ></MenuButton>
            {text}
          </div>
        );
      })}
      <div className="text-xs">
        <MenuButton
          onClick={async () => {
            setLoading(true);
            const { error } = await supabase.auth.signOut();
            setLoading(false);
          }}
          icon={<Key />}
        ></MenuButton>

        {"Log Out"}
      </div>
    </div>
  );
};

export default Sidebar;
