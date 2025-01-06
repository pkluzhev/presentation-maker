import './App.css'
import EditorView from './views/app/editor-view/EditorView'
import { BrowserRouter, Routes, Route } from "react-router";
import PlayerView from './views/app/player-view/PlayerView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorView />} />
        <Route path="/player" element={<PlayerView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App