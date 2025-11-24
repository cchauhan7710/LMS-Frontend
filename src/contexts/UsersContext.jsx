import { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const createUser = (name, email, password) => {
    setUsers(prev => [...prev, {
      id: Date.now(),
      name,
      email,
      password,
      purchased: []
    }]);
  };

  const giveCourse = (userId, courseId) => {
  setUsers(prev => prev.map(u =>
    u.id === userId && !u.purchased.find(p => p.id === courseId)
      ? { 
          ...u, 
          purchased: [...u.purchased, { id: courseId, progress: 0, lastVideoTime: 0 }] 
        }
      : u
  ));
};

  return (
    <UsersContext.Provider value={{ users, createUser, giveCourse }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
