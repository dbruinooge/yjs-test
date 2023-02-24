import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
let yarray;

const TodoList = () => {
  const [input, setInput] = useState('')
  const [items, setItems] = useState([]);

  const roomId = useLocation().pathname;

  useEffect(() => {
    const ydoc = new Y.Doc();
    const wsProvider = new WebsocketProvider(
      'ws://localhost:1234', roomId, ydoc 
    );
    wsProvider.on('status', event => {
      console.log(event.status);
    });
    yarray = ydoc.getArray(roomId);
    console.log(ydoc.clientID, wsProvider.wsconnected);
    yarray.observe(() => {
      setItems(yarray.toArray());
    });
    setItems(yarray.toArray());
  }, [roomId]);

  const handleNewItem = () => {
    yarray.push([input]);
    setInput('');
  }
  
  return ( 
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
      <button onClick={handleNewItem}>Submit</button>
      <div>
        <p>Room: {roomId}</p>
        {items.map(item => {
          return <p key={item}>{item}</p>
        })}
      </div>
    </div>
   );
}
 
export default TodoList;