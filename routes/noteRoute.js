import express from "express";
import { createNote } from "../controllers/noteController.js";

const route = express.Router();

route.post("/", createNote);

export default route;