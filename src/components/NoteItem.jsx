// src/components/NoteItem.jsx
import React from "react";

export default function NoteItem({ note, onDelete }) {
  return (
    <li className="border border-white rounded-lg p-4 flex justify-between">
      <div>
        <h3 className="text-white font-bold">{note.title}</h3>
        <p className="text-white">{note.description}</p>
        <small className="text-gray-400">
          {new Date(note.createdAt).toLocaleString()}
        </small>
      </div>
      <button
        onClick={() => onDelete(note._id)}
        className="px-3 py-1 text-sm bg-red-600 text-white rounded-md"
      >
        Delete
      </button>
    </li>
  );
}