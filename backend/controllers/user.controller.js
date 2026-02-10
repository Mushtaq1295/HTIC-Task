import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const currentUser = req.user;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Role validation
    if (currentUser.role === "admin" && role !== "user") {
      return res.status(403).json({
        message: "Admin can only create users",
      });
    }

    // SuperAdmin can create admin or user
    if (
      currentUser.role === "superadmin" &&
      !["admin", "user"].includes(role)
    ) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // Check existing user
    const existingUser = await UserModel.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      role,
      created_by: currentUser.id,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Create user error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role } = req.body;
    const currentUser = req.user;

    const userToUpdate = await UserModel.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Admin can only edit users
    if (currentUser.role === "admin" && userToUpdate.role !== "user") {
      return res.status(403).json({
        message: "Admin can only edit users",
      });
    }

    const updatedUser = await UserModel.update(id, {
      username,
      role,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    const userToDelete = await UserModel.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // SuperAdmin can delete anyone
    if (currentUser.role === "superadmin") {
      await UserModel.delete(id);
      return res.status(200).json({
        message: "User deleted successfully",
      });
    }

    // Admin restrictions
    if (currentUser.role === "admin") {
      // Admin cannot delete admins or superadmin
      if (userToDelete.role !== "user") {
        return res.status(403).json({
          message: "You do not have permission to perform this action.",
        });
      }

      // Admin can only delete users they created
      if (userToDelete.created_by !== currentUser.id) {
        return res.status(403).json({
          message: "You do not have permission to perform this action.",
        });
      }

      await UserModel.delete(id);
      return res.status(200).json({
        message: "User deleted successfully",
      });
    }

    // Normal user cannot delete
    return res.status(403).json({
      message: "You do not have permission to perform this action.",
    });
  } catch (error) {
    console.error("Delete user error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
