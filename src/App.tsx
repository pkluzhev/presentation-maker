import './App.css'
import { useEffect } from 'react'
import { TopPanel } from './views/app/top-panel/TopPanel'
import { LeftPanel } from './views/app/left-panel/LeftPanel'
import { WorkSpace } from './views/app/workspace/WorkSpace'
import { useAppActions } from "./views/hooks/useAppActions";

function App() {
  const { clearElementSelection } = useAppActions()
  useEffect(() => {
    function onClearElementSelection(event: KeyboardEvent) {
      if ((event.key === "Escape" || event.keyCode === 27) && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        clearElementSelection()
      }
    }
    window.addEventListener('keydown', onClearElementSelection);
    return () => window.removeEventListener('keydown', onClearElementSelection);
  }, []);

  return (
    <div>
      <TopPanel />
      <div className='mainSpace'>
        <LeftPanel />
        <WorkSpace />
      </div>
    </div>
  )
}

export default App