function UserTable({ users, onEdit, onDelete, currentUser }) {
  return (
    <div className="p-6">
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">S.No</th>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Created By</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const canDelete =
              currentUser.role === "superadmin" ||
              (currentUser.role === "admin" &&
                user.role === "user" &&
                user.created_by === currentUser.id);

            return (
              <tr key={user.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.created_by || "NULL"}</td>
                <td className="p-2 space-x-2">
                  {(currentUser.role === "superadmin" ||
                    (currentUser.role === "admin" &&
                      user.role === "user")) && (
                   <button
  onClick={() => onEdit(user)}
  className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
>
  Edit
</button>
                  )}

                  {canDelete && (
                    <button
                      onClick={() => onDelete(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
