// src/components/AuthForm.jsx
import React, { useState } from "react";
import API from "../api";

export default function AuthForm({ onAuthSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!email || !password) {
      setAuthError("Please fill both email and password.");
      return;
    }

    try {
      let res;

      if (isRegistering) {
        res = await API.post("/auth/register", { email, password });
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("notes_app_session", JSON.stringify({ email }));
          onAuthSuccess();
          return;
        }
      }

      res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("notes_app_session", JSON.stringify({ email }));
      onAuthSuccess();
    } catch (err) {
      console.error(err);
      setAuthError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 text-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
      <form onSubmit={handleAuthSubmit} className="space-y-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-indigo-400">
          {isRegistering ? "Create your account" : "Welcome back 👋"}
        </h2>

        {/* email */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* password */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* error message */}
        {authError && (
          <p className="text-sm text-red-500 text-center">{authError}</p>
        )}

        {/* buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
          >
            {isRegistering ? "Register" : "Login"}
          </button>

          <button
            type="button"
            onClick={() => setIsRegistering((s) => !s)}
            className="w-full py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition text-sm"
          >
            {isRegistering ? "Already have an account? Login" : "Create an account"}
          </button>
        </div>
      </form>
    </div>
  );
}
