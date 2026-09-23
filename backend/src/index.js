import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import connectDB from './config/db.js';
import 'dotenv/config';
import socketIo from './socketIo/socketIo.js';
import { chatMessages } from './controller/chat.controller.js';
import { cronJob } from './config/cronJob.js';

const app = express();
const server = http.createServer(app);
const allowedOrigins = process.env.ORIGIN_URL ? process.env.ORIGIN_URL.split(",") : ["http://localhost:5252"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());


const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "PUT"],
  },
});

socketIo(io);

connectDB(process.env.MONGOOSE_URL);

app.post('/api/chat', chatMessages);

cronJob();

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

server.listen(8080, () => console.log("Server is running on port 8080"));