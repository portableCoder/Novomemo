"use client";
import { Archive, ArrowLeft, Edit, Icon, Key, Plus, Star } from "react-feather";
import React, { useState } from "react";
import MenuButton from "./MenuButton";
import useStore from "@store/index";

const menus = [
  [Plus, "Add note"],
  [Edit, "All notes"],
  [Star, "Favorites"],
  [Archive, "Archive"],
] as [Icon, string][];

const Sidebar = () => {
  const { selectedMode, setSelectedMode } = useStore(
    ({ selectedMode, setSelectedMode }) => ({ selectedMode, setSelectedMode })
  );

  const [localMode, session] = useStore((s) => [s.localMode, s.session]);
  const setSidebarOpen = useStore((s) => s.setSidebarOpen);
  const supabase = useStore((s) => s.supabase);
  const setLoading = useStore((s) => s.setGlobalLoading);

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
      {menus.map(([ItemIcon, text], i) => {
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-2 text-xs"
          >
            <MenuButton
              onClick={() => {
                setSelectedMode(i);
              }}
              icon={<ItemIcon />}
              active={i === selectedMode}
            ></MenuButton>
            {text}
          </div>
        );
      })}
      {!localMode && session && (
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
      )}
    </div>
  );
};

export default Sidebar;
