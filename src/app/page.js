"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username dan password harus diisi!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username,
          password,
          expiresInMins: 30,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;

      // Simpan token & user di localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect ke dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-6 sm:p-20 bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col gap-6 row-start-2 items-center w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        {/* Logo */}
        <Image
          src="/next.svg"
          alt="Logo"
          width={120}
          height={30}
          className="dark:invert"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Login to Your Account
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm bg-red-100 dark:bg-red-900 px-3 py-2 rounded w-full text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:text-indigo-800">
            Register
          </a>
        </p>
      </main>
    </div>
  );
}
