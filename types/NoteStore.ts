import { Session, SupabaseClient } from "@supabase/supabase-js"
import { Menu } from "@util/Menu"

interface NoteStore {
    notes: Note[]
    localMode: boolean,
    setLocalMode: (s: boolean) => void
    globalLoading: boolean
    setGlobalLoading: (loading: boolean) => void
    setNotes: (notes: Note[]) => void
    selectedMode: Menu,
    setSelectedMode: (mode: Menu) => void
    sidebarOpen: boolean,
    setSidebarOpen: (arg: ((prev: boolean) => boolean)) => void
    session: null | Session
    setSession: (s: NoteStore['session']) => void
    supabase: SupabaseClient<any, "public", any>
    setSupabase: (s: NoteStore['supabase']) => void
    editingNote: null | number
    setEditingNote: (n: number | null) => void
    isViewing: boolean,
    setIsViewing: (viewing: boolean) => void
    isEditing: boolean,
    setEditing: (editing: boolean) => void



}

export type { NoteStore }