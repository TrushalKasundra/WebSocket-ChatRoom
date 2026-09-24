import { chatModel } from "../models/chat.model.js";
import { usersModel } from "../models/users.model.js";

const socketIo = (io) => {
io.on('connection', (socket) => {
    // You can also handle disconnection

    socket.on("join_room", (data) => {
        socket.join(data);
        usersModel.insertOne({name: "superAdmin", role: "admin", socketId: socket.id, room: data});
        console.log(`User ID :- ${socket.id} joined room : ${data}`)
    })
    socket.on("send_message", (data) => {
        chatModel.insertOne({room: data.room, message: data.message, author: data.author});
        socket.to(data.room).emit("receive_message", data)
    })
    socket.on("join_response", (data) => {
        if (data.answer === "yes"){
            usersModel.insertOne({name: data.data.name, role: "user", socketId: data.data.socket, room: data.data.room});
            io.to(data.data.socket).emit("join_response_answer",data)
        } else {
            io.to(data.data.socket).emit("join_response_answer",data)
        }
    })
    socket.on("join_request_user",(data)=>{
        const requsetData = {
            socket: socket.id,
            name: data.name,
            room: data.room 
        }
        socket.to(data.room).emit("join_request",requsetData)
    })
    socket.on('disconnect', () => {
        console.log('socket disconnected',socket.id);
    });
});

}

export default socketIo;
