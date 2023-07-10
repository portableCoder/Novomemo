import { useLocalStorage as useOriginalStore } from 'react-use'


const useLocalStore = <T>(key: string, initialValue: T) => {
    const [store, setStore] = useOriginalStore(key, initialValue)
    return ([store as T, setStore]) as [T, typeof setStore]
}

export default useLocalStore