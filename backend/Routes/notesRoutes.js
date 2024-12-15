const express = require("express");
const router = express.Router();
const Notes = require("../Models/Notes");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify JWT

// Create a note
router.post("/notes", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Notes({ userId: req.user.id, title, content });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note", error });
  }
});

// Read all notes
router.get("/notes", authMiddleware, async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Update a note
router.put("/notes/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Notes.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Delete a note
router.delete("/notes/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Notes.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
