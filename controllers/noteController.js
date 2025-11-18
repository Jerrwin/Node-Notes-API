import noteModel from "../models/noteModel.js";

//craeteNote using POST
export const createNote = async (req, res) => {
  try {
    const noteData = new noteModel(req.body);
    const { title, content } = noteData;

    const noteExist = await noteModel.findOne({ title, content });
    if (noteExist) {
      return res
        .status(400)
        .json({ message: "Note with same title and content already exists." });
    }
    const savedNote = await noteData.save();
    res.status(200).json({ savedNote });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//getNotes using GET
export const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find();
    if (notes.length === 0) {
      return res.status(400).json({ message: "No notes stored." });
    }

    const formattedNotes = notes.map((note) => ({
      id: note._id,
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
      createdAt: note.createdAt.toLocaleString(),
      LastUpdatedAt: note.updatedAt.toLocaleString(),
    }));

    res.status(200).json({ notes: formattedNotes });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//searchNotes using GET
export const searchNotes = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Please provide a title to search" });
    }
    const notes = await noteModel.find({
      title: { $regex: title, $options: "i" },
    });

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found." });
    }

    const formattedNotes = notes.map((note) => ({
      id: note._id,
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
      createdAt: note.createdAt.toLocaleString(),
      LastUpdatedAt: note.updatedAt.toLocaleString(),
    }));

    res.status(200).json({ notes: formattedNotes });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//Update using PATCH
//Using PATCH so that certain data can be updated not the whole date
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    // This safely updates only provided fields
    const updatedNote = await noteModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Note updated successfully",
      note: {
        id: updatedNote._id,
        title: updatedNote.title,
        content: updatedNote.content,
        tags: updatedNote.tags.join(", "),
        createdAt: updatedNote.createdAt.toLocaleString(),
        updatedAt: updatedNote.updatedAt.toLocaleString(),
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    res.status(500).json({ error: error.message });
  }
};
