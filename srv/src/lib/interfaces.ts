import { ObjectId } from "mongoose";

export interface NoteInterface {
  _id?: ObjectId;
  title: string;
  content: string;
  author: string;
}
