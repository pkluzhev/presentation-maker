import { Presentation } from "./types/PresentationTypes.ts";
import { validate } from "../../ajvValidator.ts";

function getFromLocalStorage() {
    const localStoragePresentation = localStorage.getItem('presentation')
    if (localStoragePresentation) {
        const presentation: Presentation = JSON.parse(localStoragePresentation)
        const valid = validate(presentation)
        if (!valid) {
            console.log("Not valid JSON data")
            return
        }
        return presentation
    }
}

export {
    getFromLocalStorage,
}