import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, login, signup, logout, loading, isAuthenticated } = useAuthContext();
  return { user, login, signup, logout, loading, isAuthenticated };
};
