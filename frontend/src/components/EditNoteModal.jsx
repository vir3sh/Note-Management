import React, { useState, useEffect } from "react";

function EditNoteModal({ closeModal, updateNote, notes }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (notes) {
      setTitle(notes.title);
      setDescription(notes.description);
    }
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote(notes._id, title, description); // Call updateNote from ProfilePage
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Edit Note</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Note</button>
        </form>
      </div>
    </div>
  );
}

export default EditNoteModal;
