"use client";
import Image from "next/image";
import Sidebar from "@components/Sidebar";
import { Menu } from "react-feather";
import useStore from "@store/index";
import { animated, useSpring, useTransition } from "react-spring";
import dynamic from "next/dynamic";
import useAuth from "@util/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import MenuButton from "@components/MenuButton";

const Gallery = dynamic(() => import("@components/Gallery"), {
  ssr: false,
});
export default function Home() {
  const session = useAuth();
  const setSidebar = useStore((s) => s.setSidebarOpen);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const sidebarSpring = useSpring({
    x: sidebarOpen ? 0 : -64,
  });
  const transitions = useTransition(sidebarOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  });

  return (
    <main className="text-white w-full  pb-2 flex gap-x-2">
      <div className=" h-full  w-16  top-0 left-0 z-50">
        <div className="h-full w-16">
          {!sidebarOpen && (
            <MenuButton
              onClick={() => setSidebar((prev) => !prev)}
              icon={<Menu />}
            ></MenuButton>
          )}
        </div>
        {transitions(
          (spring, item, _, key) =>
            item && (
              <animated.div key={key} style={spring}>
                <Sidebar />
              </animated.div>
            )
        )}
      </div>
      <div className="w-full flex">
        <Gallery />
      </div>
    </main>
  );
}
