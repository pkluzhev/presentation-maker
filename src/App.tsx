import './App.css'
import { useEffect } from 'react'
import { TopPanel } from './views/app/top-panel/TopPanel'
import { LeftPanel } from './views/app/left-panel/LeftPanel'
import { WorkSpace } from './views/app/workspace/WorkSpace'
import { useAppActions } from "./views/hooks/useAppActions";


function App() {
  const { clearElementSelection } = useAppActions()

  function onUndo() {
   
  }

  function onRedo() {
 
  }

  useEffect(() => {
    function onHandleKeyboardEvents(event: KeyboardEvent) {
      if ((event.key === "Escape" || event.keyCode === 27) && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        clearElementSelection()
      }
      if ((event.ctrlKey || event.metaKey) && event.keyCode === 90) {
        onUndo()
      }
      if ((event.ctrlKey || event.metaKey) && event.keyCode === 89) {
        onRedo()
      }
    }
    window.addEventListener('keydown', onHandleKeyboardEvents);
    return () => window.removeEventListener('keydown', onHandleKeyboardEvents);
  }, []);

  return (
    <div className='appSpace'>
        <TopPanel />
        <div className='mainSpace'>
          <LeftPanel />
          <WorkSpace />
        </div>
    </div>
  )
}

export default App