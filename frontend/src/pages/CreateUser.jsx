import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

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

      alert("User created successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-6 rounded w-96"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Create User
          </h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role selection */}
          <select
            className="w-full mb-4 p-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {user.role === "superadmin" && (
              <option value="admin">Admin</option>
            )}
            <option value="user">User</option>
          </select>

          <button className="w-full bg-green-600 text-white p-2 rounded">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
