import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

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
        alert("Failed to load user");
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

      alert("User updated successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
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
            Edit User
          </h2>

          <input
            type="text"
            className="w-full mb-3 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Role selection */}
          <select
            className="w-full mb-4 p-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {currentUser.role === "superadmin" && (
              <option value="admin">Admin</option>
            )}
            <option value="user">User</option>
          </select>

          <button className="w-full bg-blue-600 text-white p-2 rounded">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
