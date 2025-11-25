import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    axios
      .get("https://lms-backend-fezb.onrender.com/auth/all")
      .then((res) => setUsers(res.data.users));
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(`https://lms-backend-fezb.onrender.com/auth/${id}`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 md:px-10 py-10 transition">
      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
        Manage Users
      </h1>

      {/* USER LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {users.map((u) => (
          <div
            key={u._id}
            className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow 
                       border border-gray-200 dark:border-gray-700 
                       hover:shadow-lg hover:-translate-y-1 
                       transition flex flex-col justify-between"
          >
            {/* USER INFO */}
            <div className="mb-4">
              <div className="text-xl font-bold text-gray-900 dark:text-white truncate">
                {u.name}
              </div>

              <div className="text-gray-600 dark:text-gray-400 text-sm break-all mt-1">
                {u.email}
              </div>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteUser(u._id)}
              className="w-full bg-red-600 hover:bg-red-700 
                         text-white py-2 rounded-lg 
                         font-medium shadow transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
