import React, { useEffect, useState } from 'react';
import { socket } from '../socket';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { useLocation } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import useChatMessages from '../hooks/chatMessages';


const ChatSuperAdmin = ({ userName }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const { messageList, setMessageList } = useChatMessages();
    const [disable, setDisable] = useState(false);

    console.log("messageList", messageList)

    const location = useLocation(); 

    const onSubmit = async (e) => {
        e.preventDefault();
        if (currentMessage !== "") {
            setDisable(true);
            // confirmAlert({
            //     title: `Join Reqeust from `,
            //     message: 'Are you sure to add this user?.',
            //     buttons: [
            //       {
            //         label: 'Yes',
                   
            //       },
            //       {
            //         label: 'No',
            //       }
            //     ]
            // });
            const messageData = {
                
                id: Math.random(),
                room: location.pathname.replace("/",""),
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

    useEffect(()=>{
        const joinRequest = (data) => {

            const confirm = (answer,data) => {
                const response = { answer: answer, data: data}
                socket.emit("join_response",response)
            }
            console.log("sdf",data)
            confirmAlert({
                title: `Join Reqeust from ${data.name}`,
                message: 'Are you sure to add this user?.',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => confirm("yes",data)
                  },
                  {
                    label: 'No',
                    onClick: () => confirm("no",data)
                  }
                ]
            });
        }
        socket.on("join_request", joinRequest); 
        return () => {
            socket.off("join_request", joinRequest);
        };
        // eslint-disable-next-line
    },[socket])

    return (
        <div className='wrapper'>
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
        </div>
    );
}

export default ChatSuperAdmin;