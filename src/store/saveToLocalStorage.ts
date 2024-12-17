import { Presentation } from "./types/PresentationTypes.ts";

function saveToLocalStorage(presentation: Presentation): void {
    localStorage.clear()
    localStorage.setItem('presentation', JSON.stringify(presentation))
}

export {
    saveToLocalStorage,
}