import './App.css'
import { type Editor } from './store/types/EditorTypes'

import { TopPanel } from './views/app/top-panel/TopPanel'
import { LeftPanel } from './views/app/left-panel/LeftPanel'
import { WorkSpace } from './views/app/workspace/WorkSpace'

type AppProps = {
  editor: Editor,
}

function App({ editor }: AppProps) {
  return (
    <div>
      <TopPanel optionsBarState={editor.interfaceState.optionsBarState} editBarState={editor.interfaceState.editBarState} buffer={editor.interfaceState.buffer} />
      <div className='mainSpace'>
        <LeftPanel title={editor.presentation.title} slides={editor.presentation.slides} slideSelection={editor.slideSelection} />
        <WorkSpace slides={editor.presentation.slides} slideSelection={editor.slideSelection} elementSelection={editor.elementSelection} />
      </div>
    </div>
  )
}

export default App