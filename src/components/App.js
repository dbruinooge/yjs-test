import TodoList from "./TodoList";
import { Routes, Route, Link } from 'react-router-dom';

import * as Y from 'yjs';
import { useState } from "react";

const ydoc = new Y.Doc();

function App() {
  const [roomId, setRoomId] = useState();
  return (
    <div className="App">
      <input type="text" onChange={(e) => setRoomId(e.target.value)}></input>
      <Link to={roomId}><button>Go to room</button></Link>
      <Routes>
        <Route path="/:roomId" element={<TodoList roomId={roomId} ydoc={ydoc}/>}/>
      </Routes>
    </div>
  );
}

export default App;
