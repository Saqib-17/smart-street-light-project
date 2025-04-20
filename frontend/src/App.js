import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [lightStatus, setLightStatus] = useState('Connecting...');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to backend');
    });

    socket.on('lightStatus', (status) => {
      console.log('📡 Received from backend:', status);
      setLightStatus(status);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from backend');
    });

    return () => {
      socket.off('lightStatus');
    };
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Smart Street Light Monitor</h1>
        <div className={`status ${lightStatus === 'ON' ? 'on' : 'off'}`}>
          {lightStatus}
        </div>
        <p className="note">Powered by Brain.exe Stopped Working!</p>
      </div>
    </div>
  );
}

export default App;
