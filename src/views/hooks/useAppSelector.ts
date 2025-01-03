import { TypedUseSelectorHook, useSelector } from "react-redux"
import { undoableReducer } from "../../store/redux/undoableReducer"

type RootState = ReturnType<ReturnType<typeof undoableReducer>>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const usePresentSelector = () => useAppSelector(state => state.present)
const usePastSelector = () => useAppSelector(state => state.past)
const useFutureSelector = () => useAppSelector(state => state.future)

const useTitleSelector = () => useAppSelector(state => state.present.presentation.title)
const useSlideSelectionSelector = () => useAppSelector(state => state.present.slideSelection)
const useSlidesSelector = () => useAppSelector(state => state.present.presentation.slides)

const useElementSelectionSelector = () => useAppSelector(state => state.present.elementSelection)

const useEditBarStateSelector = () => useAppSelector(state => state.present.interfaceState.editBarState)
const useOptionsBarStateSelector = () => useAppSelector(state => state.present.interfaceState.optionsBarState)
const useIsPreviewActiveSelector = () => useAppSelector(state => state.present.interfaceState.isPreviewActive)

export {
    useAppSelector,
    usePresentSelector,
    usePastSelector,
    useFutureSelector,
    useTitleSelector,
    useSlideSelectionSelector,
    useSlidesSelector,
    useEditBarStateSelector,
    useOptionsBarStateSelector,
    useElementSelectionSelector,
    useIsPreviewActiveSelector
}