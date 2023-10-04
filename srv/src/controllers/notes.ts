import express from "express";
import { createNote, findNotes } from "../db/notes";
import mongoose from "mongoose";

export const postNote = async (req: express.Request, res: express.Response) => {
  const { title, content, author } = req.body;
  try {
    const note = await createNote({
      title,
      content,
      author,
    });

    console.log("New note created");
    return res.status(200).json(note);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getNotes = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  try {
    const userWithNotes = await findNotes(id);
    console.log("Notes retrieved");
    console.log(userWithNotes);
    return res.status(200).json(userWithNotes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteNote = async (
  req: express.Request,
  res: express.Response
) => {};

export const updateNote = async (
  req: express.Request,
  res: express.Response
) => {};
