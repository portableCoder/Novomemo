"use client";
import Image from "next/image";
import Sidebar from "@components/Sidebar";
import { Menu } from "react-feather";
import useStore from "@store/index";
import { animated, useSpring } from "react-spring";
import dynamic from "next/dynamic";
import useAuth from "@util/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Gallery = dynamic(() => import("@components/Gallery"), {
  ssr: false,
});
export default function Home() {
  const session = useAuth();
  const setSidebar = useStore((s) => s.setSidebarOpen);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const sidebarSpring = useSpring({
    x: sidebarOpen ? 0 : -1000,
  });

  return (
    <main className="text-white w-full  pb-2 flex gap-x-2">
      <div className="my-6 p-2">
        <button onClick={() => setSidebar((prev) => !prev)}>
          <Menu />
        </button>
      </div>
      <animated.div
        style={sidebarSpring}
        className="w-full h-full  md:w-1/4  fixed  top-0 left-0 z-50"
      >
        <Sidebar />
      </animated.div>
      <div className="w-full flex">
        <Gallery />
      </div>
    </main>
  );
}
