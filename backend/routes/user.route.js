import { Router } from "express";
const router = new Router();
import protectRoute from "../middlewares/protectRoute.js";
import { getUserForSidebar } from "../controllers/user.controller.js";

router.get('/', protectRoute, getUserForSidebar)  //get all users

export default router