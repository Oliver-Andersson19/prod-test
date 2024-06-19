import Express from "express";
import cors from "cors"
import http from "http"; // Import the built-in 'http' module for HTTP server

import routes from "./src/router/routes.js";

const app = Express();

const IP = "192.168.0.196";
const PORT = 8080;
const HTTPPORT = 8081;


app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

// app.use(Express.static(chatBotClientPath));


app.use("/api", routes);



const httpServer = http.createServer(app);

httpServer.listen(HTTPPORT, IP, () => {
    console.log(`HTTP Running at: ${IP}:${HTTPPORT}`);
});