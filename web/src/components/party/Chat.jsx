import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const socketRef = useRef();
  
/*     useEffect(() => {
      socketRef.current = io.connect('http://localhost:3000');
  
      socketRef.current.on('chat message', ({ message }) => {
        setChat([...chat, message]);
      });
  
      return () => {
        socketRef.current.disconnect();
      };
    }, [chat]);
  
    const onTextChange = (e) => {
      setMessage(e.target.value);
    };
  
    const onMessageSubmit = (e) => {
      e.preventDefault();
      const msg = message;
      socketRef.current.emit('chat message', { message: msg });
      setMessage('');
    }; */
  
    return (
      <div className='chat'>
        <h2 className='titleChat'>CHAT</h2>
        <div className='chatInterface'>
          {chat.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
{/*           <form onSubmit={onMessageSubmit}>
            <input
              name='message'
              onChange={(e) => onTextChange(e)}
              value={message}
              label='Message'
              placeholder='Type your message here...'
            />
            <button>Send</button>
          </form> */}
        </div>
      </div>
    );
  }