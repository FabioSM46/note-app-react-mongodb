import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const NoteModel = mongoose.model("Note", NoteSchema);

interface NoteInterface {
  title: string;
  content: string;
  author: string;
}

export const createNote = (values: NoteInterface) => {
  new NoteModel(values).save().then((note) => note.toObject());
};

export const getAllNotes = () => NoteModel.find().populate("author").exec();

export const getNoteById = (id: string) => NoteModel.findById(id);

export const deleteNoteById = (id: string) => NoteModel.findByIdAndDelete(id);

export const updateNoteById = (id: string, values: Record<string, any>) =>
  NoteModel.findByIdAndUpdate(id, values);
