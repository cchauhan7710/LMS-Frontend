import { useEffect, useState } from "react";

export function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://lms-backend-fezb.onrender.com/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  return user;
}
