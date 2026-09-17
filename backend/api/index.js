import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

const app = express();
const server = http.createServer(app);
app.use(cors());



const allowedOrigins = "http://localhost:5252";
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "PUT"],
    },
});

io.on('connection', (socket) => {
    console.log("socket connected", socket.id)
    // You can also handle disconnection

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User ID :- ${socket.id} joined room : ${data}`)
    })
    socket.on("send_message", (data) => {
        console.log("send message data ", data)
        socket.to(data.room).emit("receive_message", data)
    })
    socket.on("join_response", (data) => {
        if (data.answer === "yes"){
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

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});


server.listen(8080, () => console.log("Server is running on port 8080"));