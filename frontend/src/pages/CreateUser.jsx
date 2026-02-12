import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", {
        username,
        password,
        role,
      });

      toast.success("User created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300">
      <Navbar />

      <div className="flex items-center justify-center py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-96"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-600">
              Create New User
            </h2>
            <p className="text-gray-500 text-sm">
              Add a new account to the system
            </p>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="text-sm text-gray-600">Role</label>
            <select
              className="w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {user.role === "superadmin" && (
                <option value="admin">Admin</option>
              )}
              <option value="user">User</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2.5 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
