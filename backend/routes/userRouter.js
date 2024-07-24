import express from "express";
import { protectRoute } from "../controllers/authController.js";
import { getUsersForSidebar } from "../controllers/userController.js";


const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router