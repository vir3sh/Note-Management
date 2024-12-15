import { useState } from "react";
import "./Modal.css"; // Assuming you will style the modal in this CSS file

function Modal({ closeModal, addNote }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle saving the note
    addNote(title, description);
    closeModal(); // Close the modal after submitting the note
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Note</h2>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
        />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter note content"
        ></textarea>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Add Note</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
