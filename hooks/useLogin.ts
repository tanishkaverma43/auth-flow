import { useState } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err as string);
    }

    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  };
};
