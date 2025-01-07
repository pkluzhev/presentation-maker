// import { type Editor } from "../../types/EditorTypes";
// import { Presentation } from "../../types/PresentationTypes";
import { ActionType } from "../actions";
import { importImageAsync } from "../../../thunk/importImageAsync"
import { useAppActions } from "../../../views/hooks/useAppActions";

function importImage(url: string) {
    const { changeImage } = useAppActions()

    return {
        type: ActionType.IMPORT_IMAGE_ASYNC,
        payload: importImageAsync(url, changeImage),
    }
}

export {
    importImageAsync,
}