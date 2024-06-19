import { Router } from "express";
import controller from "../controllers/controller.js";

const routes = Router();

routes.get("/test", controller.test)

export default routes;