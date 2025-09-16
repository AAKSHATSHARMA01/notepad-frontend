import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import NotesDashboard from "./components/NotesDashboard";

export default function App() {
  const [route, setRoute] = useState(
    localStorage.getItem("token") ? "dashboard" : "auth"   // <-- yaha change
  );

  const handleLogout = () => {
    localStorage.removeItem("token");   // <-- yaha change
    setRoute("auth");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <header className="flex items-center justify-between mb-6">
         <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">NotesApp</h1>
  {route === "dashboard" && (
            <button
              className="text-sm px-3 py-1 rounded-md bg-red-100 text-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </header>

        {route === "auth" ? (
          <AuthForm onAuthSuccess={() => setRoute("dashboard")} />
        ) : (
          <NotesDashboard onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
