# Smart Street Light System 🚦

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

---

## Overview

The **Smart Street Light System** is an IoT project designed to automate street lighting using sensors and microcontrollers. It includes:

- A **Frontend** React app for monitoring street light status in real time.  
- A **Backend** Node.js server handling communication with IoT devices and storing data.  
- Integration with hardware components like ESP8266/ESP32, IR sensors, and relay modules.

---

## Features

### Frontend

- Real-time display of street light status  
- Responsive and simple UI built with React and Tailwind CSS  

### Backend

- Handles data from sensors and devices  
- Controls relay modules to switch street lights ON automatically when sensors detect presence  
- Stores light status and sensor data locally or in files (no database required)  
- Communicates with microcontrollers via WiFi (MQTT or simple HTTP)

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js  

---

## Setup & Run

### Prerequisites

- Node.js (v14 or above)  
- npm or yarn  
- IoT devices (ESP8266/ESP32, IR sensors, relays)  

### Frontend

```bash
git clone https://github.com/Saqib-17/smart-street-light-project.git
cd smart-street-light-project/client
npm install
npm start
````

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Backend

```bash
cd ../server
npm install
npm start
```

*(No database or authentication required)*

---

## Contribution

Feel free to fork, modify, and submit pull requests.

---

## Contact

Md. Shahidul Islam Sakib — [Email](mailto:shahidul.sakib17@gmail.com) | [GitHub](https://github.com/Saqib-17)

```
