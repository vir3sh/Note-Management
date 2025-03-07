const Note = require("../Models/Note");

const add = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const note = new Note({ title, description, userId });
    await note.save();
    res.json({ success: true, message: "noted added" });
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const note = await Note.findById(req.params.id);
    note.title = title || note.title;
    note.description = description || note.description;
    await note.save();
    res.json({ success: true, message: "note updated" });
  } catch (error) {
    console.log(error);
  }
};

const remove = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.json({ success: false, message: "note not available" });
    }
    res.json({ success: true, message: "note deleted" });
  } catch (error) {
    console.log(error);
  }
};

const list = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.find({ userId: id });
    if (!note) {
      res.json({ success: false, message: "no notes" });
    }
    res.json({ note });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { add, update, remove, list };
