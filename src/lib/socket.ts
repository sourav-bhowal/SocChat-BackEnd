import { Server } from "socket.io";

// * Set the socket events by passing the socket server to the setSocket function
export function setSocket(io: Server) {
  // * On connection
  io.on("connection", (socket) => {
    console.log("A user connected!!!", socket.id);

    // * On disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected!!!", socket.id);
    });

    // * On message
    socket.on("message", (message) => {
      console.log("message", message);
      socket.emit("message", message);
    });
  });
}
