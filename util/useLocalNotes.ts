import { useLocalStorageValue } from "@react-hookz/web"


const useLocalNotes = () => {
    const { value, set } = useLocalStorageValue<Note[]>('notes', {
        defaultValue: [],
        initializeWithValue: true
    })
    return { localNotes: value as Note[], setLocalNotes: set }
}

export default useLocalNotes 