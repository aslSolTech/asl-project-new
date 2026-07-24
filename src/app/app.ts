import http from 'http';
import express, { type Request, type Response } from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { CORS_OPTIONS } from '../shared/constant/app/dotenv.js';

// Express app
const app = express();
// Http server
const server = http.createServer(app);
// Socket.io server
const io = new Server(server, {
  cors: CORS_OPTIONS,
});

// Middleware
app.use(cors(CORS_OPTIONS));
// Increase the size limit for JSON bodies
app.use(express.json({ limit: '1mb' }));
// Increase the size limit for URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

export { server, io };
