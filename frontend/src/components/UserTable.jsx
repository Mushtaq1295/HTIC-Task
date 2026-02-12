function UserTable({ users, onEdit, onDelete, currentUser }) {
  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">S.No</th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created By</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const isSelf = currentUser.id === user.id;

              const canEdit =
                !isSelf &&
                (currentUser.role === "superadmin" ||
                  (currentUser.role === "admin" &&
                    user.role === "user"));

              const canDelete =
                !isSelf &&
                (currentUser.role === "superadmin" ||
                  (currentUser.role === "admin" &&
                    user.role === "user" &&
                    user.created_by === currentUser.id));

              return (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{user.id}</td>
                  <td className="p-3">{user.username}</td>

                  {/* Role badge */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${
                          user.role === "superadmin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-3">
                    {user.created_by || (
                      <span className="text-gray-400">NULL</span>
                    )}
                  </td>

                  <td className="p-3 space-x-2">
                    {canEdit && (
                      <button
                        onClick={() => onEdit(user)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition cursor-pointer"
                      >
                        Edit
                      </button>
                    )}

                    {canDelete && (
                      <button
                        onClick={() => onDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm transition cursor-pointer"
                      >
                        Delete
                      </button>
                    )}

                    {isSelf && (
                      <span className="text-xs text-gray-400 italic">
                        You
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty state */}
        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTable;
