import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    axios.get("http://localhost:5000/auth/all").then((res) => {
      setUsers(res.data.users);
    });
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(`http://localhost:5000/auth/${id}`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-10 min-h-screen bg-gray-50 dark:bg-gray-900 transition">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Manage Users
      </h1>

      <div className="space-y-4 max-w-3xl">
        {users.map((u) => (
          <div
            key={u._id}
            className="flex justify-between items-center p-5 rounded-xl
                       bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700"
          >
            {/* USER INFO */}
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {u.name}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {u.email}
              </div>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteUser(u._id)}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 
                         text-white font-medium shadow"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
