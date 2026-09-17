import React, { useState } from "react";
import { NotificationManager } from 'react-notifications';
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const copyToClipboard = () => {

    var copyText = document.getElementById("roomUrl");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    console.log("cope", copyText)

    // Copy the text inside the text field
    if (copyText.value && navigator.clipboard) {
      
      navigator.clipboard.writeText(`${process.env.REACT_APP_ORIGIN_URL}/${copyText.value}`);
    }
  }

  const createRoom = () => {
    if (room && room !== ""){
      try {
        socket.emit("join_room", room);
        localStorage.setItem("userName", "superAdmin");
        navigate(`/${room}`);
        NotificationManager.success('Success message', 'Success');
      } catch (error) {
        console.log("error",error)
        NotificationManager.warning('Warning message', error);
      }
    } else {
      NotificationManager.error('Please fill all the details', "Error");
    }
  }

  return (
    <div className='wrapper'>
      <div className="join_room">
        <h1 className="join_room-title">Create Room</h1>
        <input
          type="text"
          id='roomUrl'
          placeholder="Create Room url"
          onChange={(e) => setRoom(e.target.value)}
        />
        <div className="join_room-url">
          {process.env.REACT_APP_ORIGIN_URL}/{room}
        </div>
        <button className="join_room-btn" onClick={copyToClipboard}>Copy Link</button>
        <button className="join_room-btn" onClick={createRoom}>Create Room</button>
      </div>
    </div>
  )
};

export default Home;