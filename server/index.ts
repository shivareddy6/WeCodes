import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { leetcodeRoutes } from "./routes/leetcodeRoutes";
import { Server, ServerOptions } from "socket.io";
import http from "http";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:8080",
  preflightContinue: false,
};
app.use(cors());

app.use("/leetcode", leetcodeRoutes);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "chatBot";
let chatRoom = "";
let allUsers: any = [];
const room = "myRoom";

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  // socket.disconnect();

  socket.on("join_room", (data) => {
    const { username } = data;
    console.log("joining room", socket.id, username);
    socket.join(room);
    let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username });
    let chatRoomUsers = allUsers.filter((user: any) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });

  socket.on('send_message', (data) => {
    const { message, username, __createdtime__ } = data;
    io.in(room).emit('receive_message', data); // Send to all users in room, including sender
  });

  socket.on("end", () => {
    console.log('disconnecting', socket);
    socket.disconnect();
  });
});

httpServer.listen(port, (): void => {
  console.log(`Server is running at http://localhost:${port}`);
});
