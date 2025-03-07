const express = require("express");
const { add, update, remove, list } = require("../controllers/notesController");
const notesRoutes = express.Router();

notesRoutes.post("/add", add);
notesRoutes.put("/:id", update);
notesRoutes.delete("/:id", remove);
notesRoutes.get("/:id", list);

module.exports = notesRoutes;
