import { Router } from "express";
import { getMesages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = Router();


router.get('/:id',protectRoute, getMesages);
router.post('/send/:id', protectRoute, sendMessage);

export default router;