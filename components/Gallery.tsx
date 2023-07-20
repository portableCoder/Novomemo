"use client";
import dynamic from "next/dynamic";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "./Input";
import useStore from "@store/index";
import { ArrowLeft, Menu, RefreshCw, Star } from "react-feather";
import { animated, useSpring } from "react-spring";
import { useLocalStorage } from "react-use";
import NoteCard from "./NoteCard";
import { useDebouncedEffect, useLocalStorageValue } from "@react-hookz/web";
import Fuse from "fuse.js";
import Spinner from "./Spinner";
import MenuButton from "./MenuButton";
import Skeleton from "./Skeleton";
import useLocalNotes from "@util/useLocalNotes";
import { WarningModal } from "./Modal";
import { Menu as MenuEnum } from "@util/Menu";
import NoteFilter from "./Filter";
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
  const [session, supabase, localMode, notes, setNotes] = useStore(
    ({ session, supabase, localMode, notes, setNotes }) => [
      session,
      supabase,
      localMode,
      notes,
      setNotes,
    ]
  );
  const [refetch, setRefetch] = useState(false);
  const { localNotes } = useLocalNotes();
  useEffect(() => {
    if (localMode && !session && localNotes) {
      setNotes(localNotes);
    }
  }, [localNotes, refetch]);
  useEffect(() => {
    async function getNotes() {
      if (session && !localMode) {
        const { user } = session;
        setLoading(true);
        const { data, error } = await supabase
          .from("Notes")
          .select(`id,data`)
          .eq("uid", user.id);
        if (data) {
          setNotes(data?.map((el) => ({ ...el.data, id: el.id })) as Note[]);
        }
        if (error) {
          setError("Error fetching data..");
        }
        setLoading(false);
      }
    }
    getNotes();
  }, [session, refetch]);
  const [search, setSearch] = useState("");

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [searched, setSearched] = useState<Note[]>([]);
  useDebouncedEffect(
    () => {
      if (search == "") {
        setSearched(notes);
      } else {
        const fuse = new Fuse(notes, {
          keys: ["title"],
        });
        const res = fuse.search(search);
        const searchedRes = res.map((el) => el.item);
        setSearched(searchedRes);
      }
    },
    [notes, search],
    200
  );

  const filterFn = useCallback(
    (el: Note) => {
      switch (mode) {
        case MenuEnum.ALL_NOTES:
          return !el.archived;
        case MenuEnum.ARCHIVE:
          return el.archived;
        case MenuEnum.FAVORITES:
          return el.favorite;
        default:
          return true;
      }
    },
    [mode]
  );
  const currentLabels = useMemo(
    () => new Set(searched.filter(filterFn).flatMap((el) => el.labels)),
    [searched]
  );
  const labelFn = (el: Note) => {
    if (selectedLabels.length === 0) {
      return true;
    }
    const lb = new Set(el.labels);
    return selectedLabels.some((el) => {
      return lb.has(el);
    });
  };
  const labels = useMemo(
    () => new Set(notes.flatMap((el) => el.labels)),
    [notes]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <div className="w-full h-full flex flex-col  gap-y-10 px-4 py-2">
      <div className="flex flex-col  gap-x-2">
        <Input
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search..."
        />
        <NoteFilter
          labels={Array.from(labels)}
          onChange={(e) => setSelectedLabels(e)}
        />
      </div>

      <div
        ref={parent}
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 h-full"
      >
        {loading && new Array(6).fill(0).map((_, i) => <Skeleton key={i} />)}
        {!error &&
          !loading &&
          searched
            .filter(filterFn)
            .filter(labelFn)
            .map((el) => <NoteCard key={el.id} note={el} />)}
      </div>
      {error && (
        <div className="flex col-span-1 md:col-span-3 items-center justify-center gap-x-2 text-red-500">
          {error}
          <MenuButton
            onClick={() => setRefetch((prev) => !prev)}
            icon={<RefreshCw />}
          >
            {" "}
            Retry{" "}
          </MenuButton>
        </div>
      )}
      <animated.div
        style={spring}
        className="w-full h-full fixed flex flex-col gap-y-3 top-0 left-0 z-50 px-4 bg-zinc-900"
      >
        <NoteEditor refetch={() => setRefetch((prev) => !prev)} />
      </animated.div>
    </div>
  );
};

export default Gallery;
