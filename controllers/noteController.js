import noteModel from "../models/noteModel.js";

//craeteNote using POST
export const createNote = async (req, res) => {
  try {
    const noteData = new noteModel(req.body);
    const {title, content} = noteData;

    const noteExist = await noteModel.findOne({title, content});
    if (noteExist){
        return res.status(400).json({message: "Note with same title and content already exists."});
    }
    const savedNote = await noteData.save();
    res.status(200).json({savedNote});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

