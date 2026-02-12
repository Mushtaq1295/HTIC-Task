import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // fixed here

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users");
        const foundUser = res.data.find((u) => u.id === Number(id));

        if (foundUser) {
          setUsername(foundUser.username);
          setRole(foundUser.role);
        }
      } catch (error) {
        toast.error("Failed to load user");
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/users/${id}`, {
        username,
        role,
      });

      toast.success("User updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Navbar />

      <div className="flex items-center justify-center py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-96"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">
              Edit User
            </h2>
            <p className="text-gray-500 text-sm">
              Update user details
            </p>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="text-sm text-gray-600">Role</label>
            <select
              className="w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {user?.role === "superadmin" && (
                <option value="admin">Admin</option>
              )}
              <option value="user">User</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
