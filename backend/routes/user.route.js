import { Router } from "express";
const router = new Router();
import  getUserForSidebar from '../controllers/user.controller.js'
import protectRoute from '../middlewares/protectRoute.js'

router.get('/', protectRoute, getUserForSidebar)  //get all users

export default router