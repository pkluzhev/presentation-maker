import { TypedUseSelectorHook, useSelector } from "react-redux"
import { editorReducer } from "../../store/redux/editorReducer"

// Выведение типа `RootState` из хранилища
type RootState = ReturnType<typeof editorReducer>

// Используйте во всем приложении вместо `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useTitleSelector = () => useAppSelector(editor => editor.presentation.title)
const useSlideSelectionSelector = () => useAppSelector(editor => editor.slideSelection)
const useSlidesSelector = () => useAppSelector(editor => editor.presentation.slides)
const useEditBarStateSelector = () => useAppSelector(editor => editor.interfaceState.editBarState)
const useOptionsBarStateSelector = () => useAppSelector(editor => editor.interfaceState.optionsBarState)
const useElementSelectionSelector = () => useAppSelector(editor => editor.elementSelection)

export {
    useAppSelector,
    useTitleSelector,
    useSlideSelectionSelector,
    useSlidesSelector,
    useEditBarStateSelector,
    useOptionsBarStateSelector,
    useElementSelectionSelector
}