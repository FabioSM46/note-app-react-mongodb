import mongoose, { ObjectId, SaveOptions } from "mongoose";
import { UserModel } from "./users";

const NoteSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const NoteModel = mongoose.model("Note", NoteSchema);

interface NoteInterface {
  _id?: ObjectId;
  title: string;
  content: string;
  author: string;
}

export const createNote = async (values: NoteInterface) => {
  try {
    const newNote = new NoteModel(values);
    const savedNote = await newNote.save();

    // Update the user document by pushing the new note's ID to the notesId array
    const userId = savedNote.author._id.toString();
    await UserModel.findByIdAndUpdate(userId, {
      $push: { notesId: savedNote._id },
    });

    console.log("User updated");
  } catch (err) {
    console.error(err);
  }
};

export const findNotes = async (id: string) => {
  const userWithNotes = await UserModel.findById(id).populate("notesId").exec();
  return userWithNotes;
};

export const deleteNoteById = (id: string) => NoteModel.findByIdAndDelete(id);

export const updateNoteById = (id: string, values: Record<string, any>) =>
  NoteModel.findByIdAndUpdate(id, values);
