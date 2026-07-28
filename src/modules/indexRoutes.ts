import { Router } from "express";

import uploadRoutes from "./upload/upload.routes.js";

const indexRouter = Router();

indexRouter.use("/upload", uploadRoutes);

export default indexRouter;