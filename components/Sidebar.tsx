"use client";
import {
  Archive,
  ArrowLeft,
  Edit,
  Icon,
  Key,
  Plus,
  Star,
  X,
} from "react-feather";
import React, { useState } from "react";
import MenuButton from "./MenuButton";
import useStore from "@store/index";
import { animated, useTransition } from "react-spring";

const menus = [
  [Plus, "Add note"],
  [Edit, "All notes"],
  [Star, "Favorites"],
  [Archive, "Archive"],
  [Key, "Log Out"],
  [X, "Close"],
] as [Icon, string][];
export { menus };
const Sidebar = () => {
  const { selectedMode, setSelectedMode } = useStore(
    ({ selectedMode, setSelectedMode }) => ({ selectedMode, setSelectedMode })
  );

  const [localMode, session] = useStore((s) => [s.localMode, s.session]);
  const setSidebarOpen = useStore((s) => s.setSidebarOpen);
  const supabase = useStore((s) => s.supabase);
  const setLoading = useStore((s) => s.setGlobalLoading);

  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const transition = useTransition(sidebarOpen, {
    from: { opacity: 0, x: -500 },
    enter: { opacity: 1, x: 0, zIndex: 9999 },
    leave: { opacity: 0, x: 500, zIndex: -9999 },
  });
  return transition((props, item, state, key) =>
    item ? (
      <animated.div style={props} className="h-full w-full fixed top-0 left-0">
        <div className="flex w-full h-full">
          <div className=" py-2 px-2 h-full w-3/4 md:w-1/2  md:px-4  bg-zinc-900 bg-opacity-50 backdrop-blur-md flex flex-col gap-y-1.5 outline outline-1 outline-zinc-800">
            {menus.map(([ItemIcon, text], i) => {
              const isLogoutButton = text.toLowerCase() === "log out";

              const hasLoggedIn = !localMode && session;
              if (isLogoutButton && !hasLoggedIn) {
                return null;
              }

              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-2 py-4 text-xs"
                >
                  <MenuButton
                    onClick={async () => {
                      if (text.toLowerCase() === "log out") {
                        setLoading(true);
                        const { error } = await supabase.auth.signOut();
                        setLoading(false);

                        return;
                      }
                      if (text.toLowerCase() === "close") {
                        setSidebarOpen((prev) => false);
                        return;
                      }
                      setSelectedMode(i);
                      setSidebarOpen((prev) => false);
                    }}
                    icon={""}
                    buttonActive={i === selectedMode}
                  >
                    <div className="flex gap-x-2 justify-between  items-center">
                      <ItemIcon />

                      {text}
                    </div>
                  </MenuButton>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => {
              setSidebarOpen((prev) => false);
            }}
            className="w-full h-full bg-zinc-900 opacity-30"
          ></div>
        </div>
      </animated.div>
    ) : (
      <></>
    )
  );
};

export default Sidebar;
