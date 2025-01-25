import { Server } from "socket.io";

// * Set the socket events by passing the socket server to the setSocket function
export function setSocket(socket: Server) {
  // * On connection
  socket.on("connection", (socket) => {
    console.log("A user connected!!!", socket.id);
  });

  // * On disconnect
  socket.on("disconnect", (socket) => {
    console.log("A user disconnected!!!", socket.id);
  });
}
