"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          await new Promise(resolve => setTimeout(resolve, 500));
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@test.com" && password === "123456") {
          const newUser = { email, id: `user_${Date.now()}` };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          resolve(newUser);
        } else if (!email || !password) {
          reject("Email and password are required");
        } else if (email === "error@test.com") {
          reject("Server error occurred. Please try again later.");
        } else {
          reject("Invalid credentials. Please check your email and password.");
        }
      }, 1000);
    });
  };

  const signup = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "existing@test.com") {
          reject("User with this email already exists");
        } else if (!email || !password) {
          reject("Email and password are required");
        } else if (password.length < 6) {
          reject("Password must be at least 6 characters long");
        } else {
          const newUser = { email, id: `user_${Date.now()}` };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          resolve(newUser);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
