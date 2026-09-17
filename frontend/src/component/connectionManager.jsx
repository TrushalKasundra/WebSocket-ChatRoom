import { useState } from "react";
import { socket } from "../socket"

const ConnectionManager = () => {
    const [connect, setConnect] = useState(true);
    const onConnect = () => {
        socket.connect();
        setConnect(true)
    }
    const onDisconnect = () => {
        socket.disconnect();
        setConnect(false)
    }
    return (
        <div className="connectionButton">
            <button className={connect ? "connect" : ""} onClick={onConnect}>connect</button>
            <button className={connect ? "" : "disconnect"} onClick={onDisconnect}>Disconnect</button>
        </div>
    );
};
export default ConnectionManager;