import { type Editor } from "../types/EditorTypes.ts";

function saveJSON(editor: Editor): Editor {
    const blob = new Blob([JSON.stringify(editor.presentation)], { type: 'application/json' });
    const fileName: string = editor.presentation.title;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return {
        ...editor
    }
}

export {
    saveJSON,
}