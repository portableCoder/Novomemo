type Note = {
    created: number,
    title: string,
    content: any,
    labels: string[],
    favorite: boolean,
    archived: boolean,
    editor: "markdown" | "wysiwyg"
    id: string
}