import Express from "express";
import cors from "cors"
import http from "http"; // Import the built-in 'http' module for HTTP server
import "dotenv/config";
import { fileURLToPath } from 'url';
import path from 'path';

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


httpServer.listen(PORT, IP, () => {
    console.log(`HTTP Running at: ${IP}:${PORT}`);
});