import { WebSocketServer } from "ws";
import { wsConfig } from "./variables/config.js";
export default function Server() {
  let port = wsConfig.port;
  const wsServer = new WebSocketServer({ port: port });

  wsServer.on("connection", (ws) => {
    console.log("client connected");
    ws.on("message", (message) => {
      console.log("received: %s", message);
      ws.send(JSON.stringify({ data: "[Server] message received" }));
    });

    ws.send(JSON.stringify({ data: "Welcome to IPFS Server" }));
  });

  console.log(`WebSocket server is running on ws://localhost:${port}`);
}

Server();
