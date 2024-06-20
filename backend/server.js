import Express from "express";
import cors from "cors"
import http from "http"; // Import the built-in 'http' module for HTTP server
import "dotenv/config";
import { fileURLToPath } from 'url';
import path from 'path';
import { Server } from 'socket.io';

import routes from "./src/router/routes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname + "/../client/dist")



const app = Express();
const IP = process.env.BACKEND_IP
const PORT = process.env.BACKEND_PORT


app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.use(Express.static(clientPath));


app.use("/api", routes);


const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

const msgList = []

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.emit("message", msgList)

    socket.on('message', (data) => {
      console.log(socket.id + ': ' + data.msg);
      msgList.push(data)
      io.emit('message', msgList);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

httpServer.listen(PORT, IP, () => {
    console.log(`HTTP Running at: ${IP}:${PORT}`);
});