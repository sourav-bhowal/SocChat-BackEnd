import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import chatGroupRouter from "./routes/ChatGroupRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setSocket } from "./lib/socket.js";

// * Initialize the app
const app: Application = express();

// * Port
const PORT = process.env.PORT || 7000;

// * Create a http server
const httpServer = createServer(app);

// * Create a socket server which is connected to the http server so that we can use the socket events
export const socket = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins
  },
});

// * Set the socket events by passing the socket server to the setSocket function
setSocket(socket);

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User routes
app.use("/api/user", userRouter);

// Chat group routes
app.use("/api/chat-group", chatGroupRouter);

// * Start the server
httpServer.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
