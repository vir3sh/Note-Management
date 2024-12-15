const express = require("express");
const router = express.Router();
const Note = require("../Models/Note");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify JWT

// Create a note
router.post("/add", authMiddleware, async (req, res) => {
  // console.log("Authorization Header:", req.headers.authorization);
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: "false", message: "please fill all fields" });
    }

    const note = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await note.save();

    return res
      .status(200)
      .json({ success: "true", message: "note added successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: "false", message: "note couldnot successfully" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from decoded token
    const notes = await Note.find({ userId: userId }); // Assuming each note has a `user` field
    res.json({ success: true, notes });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "could not get notes " });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, title, description);
    res.json({ success: true, updateNote });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "could not update notes ", error });
  }
});

// Delete a note
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete note" });
  }
});

module.exports = router;
