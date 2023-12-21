import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { leetcodeRoutes } from "./routes/leetcodeRoutes";
import { Server, ServerOptions, Socket } from "socket.io";
import http from "http";
import { addTokens, healthCheck } from "./controllers/userFuncs/tokenData";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongoURL: string = process.env.MONGODB_URL ? process.env.MONGODB_URL : "";
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

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/addUser", async (req: Request, res: Response) => {
  const { csrfToken, session } = req.body;
  const response = await addTokens(csrfToken, session);
  res.send(response);
});

app.post("/checkUser", async (req: Request, res: Response) => {
  console.log("user touched");
  const { username } = req.body;
  const response = await healthCheck(username);
  res.send(response);
});

const CHAT_BOT = "chatBot";
let chatRoom = "";
let allUsers: Array<any> = [];
// const room = "myRoom";

const filterSocketConnections = (socket: Socket, username: String) => {
  console.log("before filtering", allUsers);
  allUsers = allUsers.filter((user) => user.username !== username);
  console.log("after filtering", allUsers);
};

const removeUserFromRoom = (socket: Socket) => {
  console.log("all users", allUsers, socket.id);
  const userDetails = allUsers.find((user) => user.id === socket.id);
  allUsers = allUsers.filter((user) => user.id !== socket.id);
  return userDetails;
};

const disconnectUser = (socket: Socket) => {
  const userDetails = removeUserFromRoom(socket);
  if (!userDetails) return;
  const { username, room } = userDetails;
  console.log("user disconnected", username);

  let __createdtime__ = Date.now();
  socket.to(room).emit("receive_message", {
    message: `${username} has exited the room`,
    username: CHAT_BOT,
    __createdtime__,
  });

  let chatRoomUsers = allUsers.filter((user: any) => user.room === room);
  socket.to(room).emit("chatroom_users", chatRoomUsers);
};

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  // socket.disconnect();
  socket.on("join_room", (data) => {
    // console.log("in", data);
    const { username, room } = data;
    // console.log("joining room", socket.id, username);
    socket.join(room);

    let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });
    console.log("sending welcome message")
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
    filterSocketConnections(socket, username);
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    console.log("all users after addition", allUsers);
    let chatRoomUsers = allUsers.filter((user: any) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });

  socket.on("send_message", (data) => {
    const { message, username, __createdtime__, room } = data;
    io.in(room).emit("receive_message", data); // Send to all users in room, including sender
  });

  socket.once("disconnecting", (reason) => {
    disconnectUser(socket);
    socket.disconnect(true);
  });

  socket.on("end", () => {
    console.log("second");
    disconnectUser(socket);
    socket.disconnect();
  });
});

try {
  httpServer.listen(port, (): void => {
    console.log(`Server is running at http://localhost:${port}`);
  });
} catch (err) {
  console.log(err);
}
