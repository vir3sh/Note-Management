const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Content: { type: String, required: true },
  UserId: { type: String, required: true },
  isPinned: { type: String, default: false },
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
