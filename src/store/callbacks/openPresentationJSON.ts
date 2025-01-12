import { type Editor } from "../types/EditorTypes.ts";
import { openJSONAction } from "../redux/actions.ts";
import { validate } from "../../../ajvValidator.ts";

function openPresentationJSON(editor: Editor): Editor {

    async function uploadFile(input: HTMLInputElement) {
        const file = input.files?.[0]
        console.log(file)
        if (!file) {
            console.log(2222222)

            return editor
        }
        const reader = new FileReader();
        reader.onload = e => {
            if (typeof e.target?.result === "string") {
                const data = JSON.parse(e.target.result)
                if (!data) {
                    return
                }
                console.log(77777777777777)
                // openJSON(data)
            }
        }
        reader.onerror = (e) => {
            console.error('Ошибка FileReader:', e);
        }
        reader.readAsText(file)
    }

    const input = document.createElement('input');
    input.type = "file"
    document.body.appendChild(input);
    input.style.display = "none"
    input.click();
    uploadFile(input)
    return editor
}

export {
    openPresentationJSON
}