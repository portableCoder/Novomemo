"use client";
import dynamic from "next/dynamic";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Skeleton from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
const Labels = [];
import { Input } from "./Input";
import useStore from "@store/index";
import { ArrowLeft, Menu, Star } from "react-feather";
import { animated, useSpring } from "react-spring";
import { useLocalStorage } from "react-use";
import NoteCard from "./NoteCard";
import { useLocalStorageValue } from "@react-hookz/web";
import Fuse from "fuse.js";
const NoteEditor = dynamic(() => import("@components/NoteEditor"), {
  ssr: false,
});

const Gallery = () => {
  const mode = useStore((prev) => prev.selectedMode);
  const setMode = useStore((prev) => prev.setSelectedMode);
  useEffect(() => {
    if (mode == 0) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [mode]);
  const spring = useSpring({
    x: mode === 0 ? 0 : 2500,
  });
  const session = useStore((s) => s.session);
  const supabase = useStore((s) => s.supabase);
  const [notes, setNotes] = useStore((s) => [s.notes, s.setNotes]);

  useEffect(() => {
    async function getNotes() {
      if (session) {
        const { user } = session;
        const { data, error } = await supabase
          .from("Notes")
          .select(`id,data`)
          .eq("uid", user.id);
        if (data) {
          setNotes(data?.map((el) => ({ ...el.data, id: el.id })) as Note[]);
        }
      }
    }
    getNotes();
  }, [session]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState<Note[]>([]);
  useEffect(() => {
    if (search == "") {
      setSearched(notes);
    } else {
      const fuse = new Fuse(notes, {
        keys: ["title"],
      });
      const res = fuse.search(search);
      setSearched(res.map((el) => el.item) || []);
    }
  }, [notes, search]);

  const [parent, enableAnimations] = useAutoAnimate();
  return (
    <div className="w-full h-full flex flex-col  gap-y-10 px-4 py-2">
      <div className="flex gap-x-2">
        <Input
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search..."
        />
      </div>
      <div
        ref={parent}
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 h-full"
      >
        {searched.map((el) => (
          <NoteCard key={el.id} note={el} />
        ))}
      </div>
      <animated.div
        style={spring}
        className="w-full h-full fixed flex flex-col gap-y-3 top-0 left-0 z-50 px-4 bg-zinc-900"
      >
        <NoteEditor />
      </animated.div>
    </div>
  );
};

export default Gallery;
