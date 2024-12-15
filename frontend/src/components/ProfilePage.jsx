import React, { useEffect, useState } from "react";
import "./Signup.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { useAuth } from "../context/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function ProfilePage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const closeModal = () => setIsModalOpen(false);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/note", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setNotes(data.notes);
        setNotes(data.notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  });
  //Add note
  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/profile");
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Delete Note
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setNotes(notes.filter((notes) => notes._id !== id)); // Remove the deleted note from the state
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="crud">
        <div className="profileSection">Hello {user.name}</div>
      </div>

      <div className="container-profile">
        {notes.map((notes) => (
          <div key={notes._id} className="card-profile">
            <h3>{notes.title}</h3>
            <p>{notes.description}</p>
            <button>
              <MdEdit />
            </button>
            <button onClick={() => deleteNote(notes._id)}>
              <MdDelete />
            </button>
          </div>
        ))}
      </div>

      <div className="btn-add">
        <button onClick={() => setIsModalOpen(true)}>+</button>
        {isModalOpen && <Modal closeModal={closeModal} addNote={addNote} />}
      </div>
    </div>
  );
}

export default ProfilePage;
