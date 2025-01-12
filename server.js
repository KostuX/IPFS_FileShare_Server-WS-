import { WebSocketServer } from "ws";
import { wsConfig } from "./variables/config.js";
import routeRequest from "./utils.js/routeRequest.js";
import { User } from "./src/user.js";
import { Client } from "./src/clients.js";
export default function Server() {
  let port = wsConfig.port;
  const wsServer = new WebSocketServer({ port: port });

  wsServer.on("connection", (ws) => {
    console.log("client connected");

    let user = new User("id", "key", ws)
    
    ws.on("message", (message) => {
      message = JSON.parse(message);
      ws.send(JSON.stringify({ type: "INFO", data: "Message received" }));

      if (message.type != "INFO") {
        routeRequest(message);
      }
    });

    ws.send(JSON.stringify({ type: "INFO", data: "Welcome to IPFS Server" }));
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`WebSocket server is running on ws://localhost:${port}`);
}

Server();
