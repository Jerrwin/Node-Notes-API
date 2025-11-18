import express from "express";
import { createNote,getNotes, searchNotes,updateNote, deleteNote } from "../controllers/noteController.js";

const route = express.Router();

route.post("/add", createNote);
route.get("/getAll", getNotes);
route.get("/search", searchNotes);
route.patch("/update/:id", updateNote);
route.delete("/delete/:id", deleteNote);

export default route;