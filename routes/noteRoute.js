import express from "express";
import { createNote,getNotes } from "../controllers/noteController.js";

const route = express.Router();

route.post("/", createNote);
route.get("/", getNotes);

export default route;