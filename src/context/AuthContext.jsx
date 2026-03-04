import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const STORAGE_KEY = "auth_user";

const CREDENTIALS = {
  admin: { password: "admin123", role: "admin" },
  user: { password: "user123", role: "user" },
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  const login = (username, password) => {
    const normalizedUsername = username?.trim().toLowerCase();
    const account = CREDENTIALS[normalizedUsername];

    if (!account || account.password !== password) {
      return { success: false, message: "Invalid username or password" };
    }

    const nextUser = { username: normalizedUsername, role: account.role };
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    return { success: true, user: nextUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
