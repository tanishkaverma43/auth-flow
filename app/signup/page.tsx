"use client";
import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import Link from "next/link";

export default function SignupPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSignup,
  } = useSignup();

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

   
    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }


    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSignup();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('data:image/jpeg;base64,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')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-90 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
