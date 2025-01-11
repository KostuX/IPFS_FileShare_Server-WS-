import { WebSocketServer } from "ws";
import { wsConfig } from "./variables/config.js";
export default function Server() {
  let port = wsConfig.port;
  const wsServer = new WebSocketServer({ port: port });

  wsServer.on("connection", (ws) => {
    console.log("client connected");
    ws.on("message", (message) => {
      console.log("received: %s", message);
      ws.send("[Server] message received: %s", message);
    });

    ws.send("Welcome to IPFS Server");
  });

  console.log(`WebSocket server is running on ws://localhost:${port}`);
}

Server();
