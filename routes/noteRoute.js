import express from "express";
import {
  createNote,
  getNotes,
  searchNotes,
  updateNote,
  deleteNote,
  searchByTag,
} from "../controllers/noteController.js";

const route = express.Router();

route.post("/add", createNote);
route.get("/getAll", getNotes);
route.get("/search", searchNotes);
route.get("/search/tags", searchByTag);
route.patch("/update/:id", updateNote);
route.delete("/delete/:id", deleteNote);

export default route;
