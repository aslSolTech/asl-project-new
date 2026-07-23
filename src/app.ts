import http from "http";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
});

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Increase the size limit for JSON bodies
app.use(express.json({limit: "1mb"}));
// Increase the size limit for URL-encoded bodies
app.use(express.urlencoded({ extended: true , limit: "5mb"}));

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

export { server };