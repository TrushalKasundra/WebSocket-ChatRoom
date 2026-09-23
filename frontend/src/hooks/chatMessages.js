import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useChatMessages = () => {
    const [messageList, setMessageList] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const chatMessages = async () => {
            try {
                const room = location.pathname.replace("/", "");
                const response = await fetch(`${process.env.REACT_APP_SOCKET_URL}/api/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ room }),
                });
                const data = await response.json();
                if (response.ok) {
                    setMessageList(data);
                }
            }
            catch (error) {
                console.error("Error fetching chat messages:", error);
            }
        };

        chatMessages();

    }, [location.pathname]);

    return { messageList, setMessageList };
};

export default useChatMessages;