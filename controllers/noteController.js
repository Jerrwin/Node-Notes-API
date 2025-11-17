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
    }));

    res.status(200).json({ notes: formattedNotes });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
