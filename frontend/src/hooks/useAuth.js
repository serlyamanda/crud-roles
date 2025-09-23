import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (token && role) {
      setUser({ token, role, email });
    }
  }, []);

  return user;
}
