import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import UserTable from "../components/UserTable";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";






function Dashboard() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
  navigate(`/edit/${user.id}`);
};

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <Navbar />
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentUser={user}
      />
    </div>
  );
}

export default Dashboard;
