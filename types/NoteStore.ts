import { Session, SupabaseClient } from "@supabase/supabase-js"

interface NoteStore {
    notes: Note[]
    setNotes: (notes: Note[]) => void
    selectedMode: number,
    setSelectedMode: (mode: number) => void
    sidebarOpen: boolean,
    setSidebarOpen: (arg: ((prev: boolean) => boolean)) => void
    session: null | Session
    setSession: (s: NoteStore['session']) => void
    supabase: SupabaseClient<any, "public", any>
    setSupabase: (s: NoteStore['supabase']) => void

}

export type { NoteStore }