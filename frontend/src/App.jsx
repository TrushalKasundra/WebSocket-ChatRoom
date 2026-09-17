import '../src/style/App.css';
import React, { useEffect } from 'react';
import 'react-notifications/lib/notifications.css';
import { socket } from './socket';
import { NotificationContainer } from 'react-notifications';
import Header from './section/Header.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Home.jsx';
import ChatSuperAdmin from './pages/ChatSuperAdmin.jsx';
import ChatUser from './pages/ChatUser.jsx';

function App() {
  const userName = localStorage.getItem("userName");


  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
          {userName === "superAdmin" &&
            <Route path={`/:roomPath`} element={<ChatSuperAdmin userName={userName} />} />}
          {userName !=="superAdmin" &&
          <Route path={`/:roomPath`} element={<ChatUser/>} />}
      </Routes>
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;
