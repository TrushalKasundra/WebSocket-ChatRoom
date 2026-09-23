import React, { useEffect, useState } from 'react';
import { socket } from '../socket';
import { useLocation } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import useChatMessages from '../hooks/chatMessages';

const ChatUser = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [username, setusername] = useState("");
    const [requserAccepted, setrequserAccepted] = useState(false);
    const {messageList, setMessageList} = useChatMessages();
    const [disable, setDisable] = useState(false);
    const location = useLocation();
    const room = location.pathname.replace("/", "");

    const userName = localStorage.getItem("userName");

    const joinChat = () => {
        if (username !== "" && room !== "") {
            try {
                const userData = {
                    name: username,
                    room: room
                }
                socket.emit("join_request_user", userData);
                localStorage.setItem("userName",username)
                NotificationManager.success('Success message', 'Success');
            } catch (error) {
                NotificationManager.warning('Warning message', error);
            }
        } else {
            NotificationManager.error('Please fill all the details', "Error");
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (currentMessage !== "") {
            setDisable(true);
            const messageData = {
                id: Math.random(),
                room: room,
                author: userName,
                message: currentMessage,
                time:
                    (new Date(Date.now()).getHours() % 12) +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
            setDisable(false)
        }
    };

    useEffect(() => {
        const handleReceiveMsg = (data) => {
            setMessageList((list) => [...list, data]);
        };
        socket.on("receive_message", handleReceiveMsg);

        return () => {
            socket.off("receive_message", handleReceiveMsg);
        };
        // eslint-disable-next-line
    }, [socket]);

    useEffect(() => {
        const joinResponseFunction = (data) => {
            console.log("sfds",data)
            if (data.answer === "yes") {
                NotificationManager.success('Requset Accepted', 'Success');
                socket.emit("join_room", data.data.room);
                setrequserAccepted(true);
            } else {
                NotificationManager.error('Requset Rejected', "Error");
                localStorage.removeItem("userName")
            }
        }
        socket.on("join_response_answer", joinResponseFunction);
        return () => {
            socket.off("join_response_answer", joinResponseFunction);
        };
        // eslint-disable-next-line
    }, [socket])

    useEffect(()=>{
        //
    },[userName])

    return (
        <div className='wrapper'>
            {(!requserAccepted) ?
                <div className="join_room">
                    <h1 className="join_room-title">Join Chat</h1>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        onChange={(e) => setusername(e.target.value)}
                    />
                    <button className="join_room-btn" onClick={joinChat}>Join</button>
                </div> :
                <div className='chat'>
                    <h2 className='chat-title'>Welcome, {userName} !</h2>
                    <div className='messageList'>
                        {
                            messageList.map((event, index) => {
                                if (event.author === userName) {
                                    return (
                                        <div key={index} className='message-user-box'>
                                            <div className='message-user'>{event.message}</div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index} className='message-other-box'>
                                            <div className='message-other'>
                                                <div className='author'>{event.author} :</div>
                                                <div>{event.message}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <form onSubmit={onSubmit}>
                        <input name="message" placeholder="Enter a message..." value={currentMessage} onChange={(e) => { setCurrentMessage(e.target.value) }} />
                        <button type="submit" disabled={disable}>Send</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default ChatUser;