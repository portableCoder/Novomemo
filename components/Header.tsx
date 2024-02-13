import useStore from "@store/index";
import React from "react";
import { ArrowLeft, Menu } from "react-feather";
import { menus } from "./Sidebar";

const Header = () => {
  const setSidebar = useStore((s) => s.setSidebarOpen);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const mode = useStore((s) => s.selectedMode);
  return (
    <>
      <div className="h-8 md:h-16 w-full "></div>
      <div
        style={{
          zIndex: 9999,
        }}
        className="h-8 flex  items-center md:h-16 w-full p-2 z-50 fixed backdrop-blur-md bg-zinc-900 text-white left-0 top-0"
      >
        <button
          onClick={() => {
            setSidebar((prev) => !prev);
          }}
          className="text-2xl p-2"
        >
          {sidebarOpen ? <ArrowLeft /> : <Menu />}
        </button>
        <div className="text-xl md:text-2xl">{menus[mode][1]}</div>
      </div>
    </>
  );
};

export default Header;
