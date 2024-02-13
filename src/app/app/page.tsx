"use client";
import Sidebar from "@components/Sidebar";
import useStore from "@store/index";
import { animated, useSpring, useTransition } from "react-spring";
import dynamic from "next/dynamic";
import useAuth from "@util/useAuth";

import Header from "@components/Header";

const Gallery = dynamic(() => import("@components/Gallery"), {
  ssr: false,
});
function App() {
  return (
    <main className="text-white w-full  pb-2 flex flex-col gap-x-2">
      <Header />
      <Sidebar />
      {}
      <div className="w-full flex">
        <Gallery />
      </div>
    </main>
  );
}
export default dynamic(() => Promise.resolve(App), { ssr: false });
