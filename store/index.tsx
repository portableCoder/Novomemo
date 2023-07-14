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
    globalLoading: false,
    setGlobalLoading(loading) {
      set({
        globalLoading: loading,
      });
    },
    sidebarOpen: true,
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
    editingNote: null,

    setEditingNote(n) {
      set({ editingNote: n });
    },
    isViewing: false,
    setIsViewing(viewing) {
      set({ isViewing: viewing });
    },
    isEditing: false,
    setEditing(s) {
      set({ isEditing: s });
    },
  }))
);
export default useStore;
