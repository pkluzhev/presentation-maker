import './App.css'
// import { type Editor } from './store/types/EditorTypes'

import { TopPanel } from './views/app/top-panel/TopPanel'
import { LeftPanel } from './views/app/left-panel/LeftPanel'
import { WorkSpace } from './views/app/workspace/WorkSpace'
import { useAppSelector } from "./views/hooks/useAppSelector";

// type AppProps = {
//   editor: Editor,
// }

function App(){   //{ editor }: AppProps) {

  // useEffect(() => {
  //   function handleScroll(e) {
  //     console.log(window.scrollX, window.scrollY);
  //   }
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // const editor = useAppSelector((editor => editor))
  // const slides = editor.presentation.slides
  // const selection = editor.selection
  // const selectedSlide: SlideType = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]

  // return (
  //   <div>
  //     <TopPanel optionsBarState={editor.interfaceState.optionsBarState} editBarState={editor.interfaceState.editBarState} buffer={editor.interfaceState.buffer} />
  //     <div className='mainSpace'>
  //       <LeftPanel title={editor.presentation.title} slides={editor.presentation.slides} slideSelection={editor.slideSelection} />
  //       <WorkSpace slides={editor.presentation.slides} slideSelection={editor.slideSelection} elementSelection={editor.elementSelection} />
  //     </div>
  //   </div>
  // )


  return (
    <div>
      <TopPanel/>
      <div className='mainSpace'>
        <LeftPanel/>
        <WorkSpace/>
      </div>
    </div>
  )
}

export default App