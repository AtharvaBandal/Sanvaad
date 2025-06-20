import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {sendMessage,getMessages} from "../controllers/messageController.js";

const router = express.Router();

router.get('/:id',protectRoute,getMessages)
router.post('/send/:id',protectRoute,sendMessage)

export default router;