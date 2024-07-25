const express = require("express");
const {
  addNote,
  editNote,
  getAllNotes,
  deleteNote,
  updateIsPinned,
  searchNote,
} = require("../controllers/noteController");
const { authenticateToken } = require("../utilities");

const noteRouter = express.Router();

noteRouter.post("/add", authenticateToken, addNote);
noteRouter.put("/edit/:noteId", authenticateToken, editNote);
noteRouter.get("/all", authenticateToken, getAllNotes);
noteRouter.get("/search-note", authenticateToken, searchNote);
noteRouter.delete("/delete/:noteId", authenticateToken, deleteNote);
noteRouter.put("/edit-isPinned/:noteId", authenticateToken, updateIsPinned);

module.exports = noteRouter;
