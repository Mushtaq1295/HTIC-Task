import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Role Dashboard</h1>
      <div className="flex gap-4 items-center">
        <span>{user?.username}</span>
         <button
        //   onClick={logout}
        onClick={() => navigate('/create')}
          className="bg-blue-500 px-3 py-1 rounded"
        >
          Add
        </button>
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
