import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const NoteModel = mongoose.model("Note", NoteSchema);

export const getNotes = () => NoteModel.find();

