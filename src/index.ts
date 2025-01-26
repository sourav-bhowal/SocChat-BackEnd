import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import chatGroupRouter from "./routes/ChatGroupRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setSocket } from "./lib/socket.js";
import { createAdapter } from "socket.io-redis-streams-adapter";
import { redis } from "./lib/redis.js";

// * Initialize the app
const app: Application = express();

// * Port
const PORT = process.env.PORT || 7000;

// * Create a http server
const httpServer = createServer(app);

// * Connect to the redis client
await redis.connect();

// * Create a socket server which is connected to the http server so that we can use the socket events
export const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins
  },
  adapter: createAdapter(redis), // * Create an adapter for the socket server to use redis streams
});

// * Set the socket events by passing the socket server to the setSocket function
setSocket(io);

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
