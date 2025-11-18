import express from "express";
import { createNote,getNotes, searchNotes,updateNote } from "../controllers/noteController.js";

const route = express.Router();

route.post("/", createNote);
route.get("/", getNotes);
route.get("/search", searchNotes);
route.patch("/update/:id", updateNote);

export default route;