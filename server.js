import { WebSocketServer } from "ws";
import { wsConfig } from "./variables/config.js";
import routeRequest from "./utils.js/routeRequest.js";
import { User } from "./src/user.js";
import { Client } from "./src/clients.js";

export default async function Server() {
  let port = wsConfig.port;
  const wsServer = new WebSocketServer({ port: port });

  wsServer.on("connection", (ws) => {
    console.log("client connected");

    ws.on("message", async (message) => {
      message = JSON.parse(message);
      console.log("Message received");

      ws.send(JSON.stringify({ type: "LOG", data: "Message received" }));

      if (message.type != "JOB") {
        const res = await routeRequest(message);
        ws.send(JSON.stringify({ type: "INFO", data: res }));
      }
    });

    ws.send(JSON.stringify({ type: "LOG", data: "Welcome to IPFS Server" }));
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`WebSocket server is running on ws://localhost:${port}`);
}

Server();
