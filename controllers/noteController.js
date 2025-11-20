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
    res.status(500).json({ error: error.message });
  }
};

//getNotes using GET
export const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find();
    if (notes.length === 0) {
      return res.status(200).json({ message: "No notes stored." });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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

//Delete using DELETE
export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const noteExist = await noteModel.findById(id);
    if (!noteExist) {
      return res.status(404).json({ message: "Note not found." });
    }
    await noteModel.findByIdAndDelete(id);
    res.status(202).json({ message: "Note deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search notes by tag(s) using GET
// Example: GET /notes/tags?tag=work,urgent   OR   GET /notes/tags?tag=shopping
export const searchByTag = async (req, res) => {
  try {
    const { tag } = req.query;

    if (!tag || tag.trim() === "") {
      return res
        .status(400)
        .json({ message: "Please provide at least one tag to search" });
    }

    // Split comma-separated tags and trim whitespace
    const tagsArray = tag
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Search for notes that have ANY of the provided tags
    const notes = await noteModel.find({
      tags: { $in: tagsArray }, // MongoDB $in operator
    });

    if (notes.length === 0) {
      return res
        .status(404)
        .json({
          message: `No notes found with tag(s): ${tagsArray.join(", ")}`,
        });
    }

    const formattedNotes = notes.map((note) => ({
      id: note._id,
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
      createdAt: note.createdAt.toLocaleString(),
      updatedAt:
        note.updatedAt?.toLocaleString() || note.createdAt.toLocaleString(),
    }));

    res.status(200).json({
      message: `Found ${notes.length} note(s) matching tag(s): ${tagsArray.join(
        ", "
      )}`,
      count: notes.length,
      notes: formattedNotes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
