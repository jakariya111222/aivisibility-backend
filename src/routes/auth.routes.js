import express from "express";
const router = express.Router();
import protect from "../middleware/auth.middleware.js";
import {
  login,
  getMe,
} from "../controllers/auth.controller.js";

router.post("/login", login);

router.get("/me", protect, getMe);

export default router;