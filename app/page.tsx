"use client";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (

    
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
        
          
          <div className="bg-white shadow rounded-lg p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to the Dashboard!
              </h1>
              <p className="text-lg text-gray-600">
                You are successfully logged in as <span className="font-semibold text-indigo-600">{user?.email}</span>
              </p>
            </div>
          </div>
   

          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleLogout}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
