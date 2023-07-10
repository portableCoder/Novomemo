import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NoteStore } from "@app_types/NoteStore";
import createClient from "@util/createClient";

const useStore = create<NoteStore>()(
  devtools((set) => ({
    selectedMode: 1,
    setSelectedMode(mode: number) {
      set({ selectedMode: mode });
    },
    notes: [],
    setNotes(notes) {
      set({
        notes,
      });
    },
    sidebarOpen: false,
    setSidebarOpen(arg) {
      set((prev) => ({ sidebarOpen: arg(prev.sidebarOpen) }));
    },
    session: null,
    setSession(s) {
      set({
        session: s,
      });
    },
    supabase: createClient(),
    setSupabase(client) {
      set({ supabase: client });
    },
  }))
);
export default useStore;
