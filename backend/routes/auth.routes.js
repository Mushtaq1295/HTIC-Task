import express from "express";
import {
  login,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Login
router.post("/login", login);

// Get current logged-in user
router.get("/me", protect, getCurrentUser);

// Logout (optional)
router.post("/logout", protect, logout);

export default router;
