// src/components/NotesDashboard.jsx
import React, { useState, useEffect } from "react";
import API from "../api";
import NoteItem from "./NoteItem";

export default function NotesDashboard({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");

  // fetch notes from backend
  useEffect(() => {
    API.get("/notes")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.notes;
        setNotes(data || []);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          onLogout();
        }
      });
  }, [onLogout]);

  const addNote = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await API.post("/notes", { title, description });
      const newNote = res.data.note || res.data;
      setNotes([newNote, ...notes]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const visibleNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(filter.toLowerCase()) ||
      n.description?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* form */}
      <section className="md:col-span-1 bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Add a New Note
        </h2>

        <form onSubmit={addNote} className="space-y-4">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <textarea
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            ➕ Add Note
          </button>
        </form>

        <input
          placeholder="🔍 Search notes..."
          className="w-full mt-6 px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </section>

      {/* notes list */}
      <main className="md:col-span-2 bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Your Notes</h2>

        {visibleNotes.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">No notes found ✨</div>
        ) : (
          <ul className="space-y-4">
            {visibleNotes.map((note) => (
              <NoteItem key={note._id} note={note} onDelete={deleteNote} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
