import { EditorState } from "draft-js";

enum EditorActionKind {
    SET_MD = 'SET_MD',
    SET_LABELS = 'SET_LABELS',
    SET_FAVORITE = 'SET_FAVORITE',
    SET_TITLE = 'SET_TITLE',
    SET_LABEL_VALUE = 'SET_LABEL_VALUE',
    SET_FOCUSED = 'SET_FOCUSED',
    RESET = "RESET",
    SET_STATE = "SET_STATE",

}

// An interface for our actions
interface EditorAction {
    type: EditorActionKind;
    payload?: any;
}

// An interface for our state
interface NoteEditorState {

    focused: boolean,
    labelValue: string,
    title: string,
    data: string
    favorite: boolean
    labels: string[]
}
const initialState: NoteEditorState = {
    title: "",
    data: "",
    favorite: false,
    labels: [],
    labelValue: "",
    focused: false,


}
// Our reducer function that uses a switch statement to handle our actions
function noteEditorReducer(state: NoteEditorState, action: EditorAction): NoteEditorState {
    const { type, payload } = action;
    switch (type) {
        case EditorActionKind.SET_MD:
            return { ...state, data: payload }
        case EditorActionKind.SET_TITLE:

            return { ...state, title: payload }
        case EditorActionKind.SET_FAVORITE:
            return { ...state, favorite: payload }
        case EditorActionKind.SET_FOCUSED:

            return { ...state, focused: payload }
        case EditorActionKind.SET_LABELS:
            return { ...state, labels: payload }

        case EditorActionKind.SET_LABEL_VALUE:
            return { ...state, labelValue: payload }
        case EditorActionKind.RESET:
            return initialState
        case EditorActionKind.SET_STATE:
            return payload
        default:
            return state;
    }
}
export {
    noteEditorReducer, initialState, EditorActionKind
}
export type {
    EditorAction,
    NoteEditorState
}