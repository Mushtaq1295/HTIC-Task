import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.middleware.js";

const router = express.Router();

// Get all users
router.get(
  "/",
  protect,
  authorizeRoles("superadmin", "admin"),
  getAllUsers
);

// Create user
router.post(
  "/",
  protect,
  authorizeRoles("superadmin", "admin"),
  createUser
);

// Update user
router.put(
  "/:id",
  protect,
  authorizeRoles("superadmin", "admin"),
  updateUser
);

// Delete user
router.delete(
  "/:id",
  protect,
  authorizeRoles("superadmin", "admin"),
  deleteUser
);

export default router;
