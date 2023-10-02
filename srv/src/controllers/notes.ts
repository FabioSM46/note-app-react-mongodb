import express from "express";
import { createNote, getAllNotes } from "../db/notes";

export const postNote = async (req: express.Request, res: express.Response) => {
  const { title, content, author } = req.body;
  try {
    const note = await createNote({
      title,
      content,
      author,
    });
    console.log("New note created");
    return res.status(200).json(note).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getNotes = async (req: express.Request, res: express.Response) => {
const { id } = req.params;
  try {
    const notes = await getAllNotes();
    console.log("Notes retrieved");
    return res.status(200).json(notes);
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
