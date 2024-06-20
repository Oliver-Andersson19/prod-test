import { useState, useEffect } from 'react'
import { socket } from './socket';

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);

  const [msgList, setMsgList] = useState([])
  const [msg, setMsg] = useState("")

  console.log(import.meta.env.VITE_SOCKET_URL)

  const sendMessage = () => {
    socket.emit('message', {msg: msg, id: socket.id}); // Emit the message event
    setMsg(""); // Clear the input field after sending
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onNewMessage(value) {
      setMsgList(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onNewMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onNewMessage);
    };
  }, []);

  return (
    <div className='page-wrapper'>
      <div className="chat-wrapper">
        <div className="chat-log">
          
          {msgList.map((data, i) => {
            return (<div
                key={i}
                className={data.id === socket.id ? "chat-you-bubble" : "chat-other-bubble"}
              >
              {data.msg}
            </div>)
          })}

        </div>
        <div className="input-wrapper">
          <input type="text" placeholder='Message...' value={msg} onChange={(e) => setMsg(e.target.value)}/>
          <button onClick={sendMessage}></button>
        </div>
      </div>
    </div>
  )
}

export default App
