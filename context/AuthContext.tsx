"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  id: string;
}

interface StoredUser {
  email: string;
  id: string;
  password: string; 
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
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          await new Promise(resolve => setTimeout(resolve, 500));
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        localStorage.removeItem("currentUser");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          console.log("Login attempt for:", email);
          
       
          const usersData = localStorage.getItem("users");
          console.log("Users data from localStorage:", usersData);
          
          if (!usersData) {
            console.log("No users found in localStorage");
            reject("No users found. Please signup first.");
            return;
          }

          const users: StoredUser[] = JSON.parse(usersData);
          console.log("Parsed users:", users);
         
          const foundUser = users.find(user => 
            user.email === email && user.password === password
          );
          
          console.log("Found user:", foundUser);
          
          if (foundUser) {
            const userInfo: User = { email: foundUser.email, id: foundUser.id };
            setUser(userInfo);
          
            localStorage.setItem("currentUser", JSON.stringify(userInfo));
            console.log("Login successful, user set:", userInfo);
            resolve(userInfo);
          } else {
            console.log("No matching user found");
            reject("Invalid credentials. Please check your email and password.");
          }
        } catch (error) {
          console.error("Login error:", error);
          reject("Error during login. Please try again.");
        }
      }, 1000);
    });
  };

  const signup = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          console.log("Signup attempt for:", email);
          
        
          const existingUsersData = localStorage.getItem("users");
          const existingUsers: StoredUser[] = existingUsersData ? JSON.parse(existingUsersData) : [];
          
          console.log("Existing users:", existingUsers);
          
        
          const userExists = existingUsers.find(user => user.email === email);
          if (userExists) {
            console.log("User already exists:", userExists);
            reject("User with this email already exists");
            return;
          }

          if (!email || !password) {
            reject("Email and password are required");
            return;
          }
          
          if (password.length < 6) {
            reject("Password must be at least 6 characters long");
            return;
          }

          const newUser: StoredUser = { 
            email, 
            id: `user_${Date.now()}`,
            password
          };
          
          console.log("Creating new user:", newUser);
          
      
          const updatedUsers = [...existingUsers, newUser];
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          
          console.log("Updated users array:", updatedUsers);
          console.log("Users stored in localStorage");
          
        
          const userInfo: User = { email: newUser.email, id: newUser.id };
          setUser(userInfo);
          localStorage.setItem("currentUser", JSON.stringify(userInfo));
          
          console.log("Signup successful, user set:", userInfo);
          resolve(userInfo);
        } catch (error) {
          console.error("Signup error:", error);
          reject("Error during signup. Please try again.");
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
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
