import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  FaLightbulb,
  FaClock,
  FaWalking,
  FaBolt,
  FaBatteryThreeQuarters,
  FaCog,
  FaMicrochip,
  FaBroadcastTower,
  FaPlug,
  FaClipboardList,
} from "react-icons/fa";


import "./App.css";


const socket = io("http://localhost:5000");


function App() {
  const [lightStatus, setLightStatus] = useState("Connecting...");
  const [lastMotion, setLastMotion] = useState("--");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [activationCount, setActivationCount] = useState(0);


  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to backend");
    });


    socket.on("disconnect", () => {
      console.log("❌ Disconnected from backend");
    });


    socket.on("lightStatus", (status) => {
      console.log("📡 Received:", status);


      setLightStatus(status);


      if (status === "ON") {
        setLastMotion(new Date().toLocaleString());
        setActivationCount((prev) => prev + 1);
      }
    });


    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);


    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("lightStatus");
      clearInterval(timer);
    };
  }, []);


  return (
    <div className="container">
      <div className="card">
        <h1>Smart Street Light Monitor</h1>


        <div className={`status ${lightStatus === "ON" ? "on" : "off"}`}>
          <FaLightbulb className="status-icon" />
          <span>{lightStatus}</span>
        </div>


        <div className="grid">
          <div className="info-card">
            <h3>
              <FaClock className="icon" />
              Current Time
            </h3>
            <p>{currentTime}</p>
          </div>


          <div className="info-card">
            <h3>
              <FaWalking className="icon" />
              Last Motion
            </h3>
            <p>{lastMotion}</p>
          </div>


          <div className="info-card">
            <h3>
              <FaBolt className="icon" />
              Activations
            </h3>
            <p>{activationCount}</p>
          </div>


          <div className="info-card">
            <h3>
              <FaBatteryThreeQuarters className="icon" />
              Energy Saved
            </h3>
            <p>78%</p>
          </div>
        </div>


        <div className="system-box">
          <h2>
            <FaCog className="section-icon" />
            System Health
          </h2>


          <div className="health-item">
            <span>
              <FaMicrochip className="health-icon" />
              Arduino Nano
            </span>


            <span className="online">Online</span>
          </div>


          <div className="health-item">
            <span>
              <FaBroadcastTower className="health-icon" />
              Motion Sensor
            </span>


            <span className="online">Active</span>
          </div>


          <div className="health-item">
            <span>
              <FaPlug className="health-icon" />
              Relay Module
            </span>


            <span className="online">Working</span>
          </div>
        </div>


        <div className="logs">
          <h2>
            <FaClipboardList className="section-icon" />
            Activity Log
          </h2>


          <p>• Motion detected at {lastMotion}</p>
          <p>• Street Light Status: {lightStatus}</p>
          <p>• System running normally.</p>
        </div>


        <p className="note">
          Powered by <strong>Brain.exe Stopped Working 🚀</strong>
        </p>
      </div>
    </div>
  );
}


export default App;
